import type { Command, DiscordMessage } from "../types";
import { DiscordCommandOptionType } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import {
  followUpMessageEdit,
  getMessagesOfChannel,
  getOptionValue,
} from "../functions";

export default {
  manifest: {
    name: "tldr",
    description: "[BETA] summarize the last 100 messages",
    options: [
      {
        type: DiscordCommandOptionType.INTEGER,
        name: "amount",
        description:
          "Number of messages to summarize, starting from last (default: 10)",
        min_value: 1,
        max_value: 100,
      },
    ],
  },

  execute: async (interaction, c) => {
    if (!interaction.channel_id) throw new HTTPException(400);
    if (!NLPCLOUD_KEY) throw new HTTPException(500);

    const amount = getOptionValue(interaction.data?.options, "amount") || 10;

    const getSummary = async (
      messageList: Promise<DiscordMessage[]>
    ): Promise<Partial<DiscordMessage>> => {
      const formatedConversation = messageList.then((list) =>
        list
          .map((msg) =>
            msg.content ? `${msg.author.id}: ${msg.content}` : null
          )
          .filter(Boolean)
          .reverse()
          .join("\n\n")
      );

      const apiResponse: { summary_text: string } = await fetch(
        "https://api.nlpcloud.io/v1/bart-large-samsum/summarization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${NLPCLOUD_KEY}`,
          },
          body: JSON.stringify({
            text: await formatedConversation,
          }),
        }
      ).then((res) => res.json());

      const tldr = apiResponse.summary_text.replaceAll(
        /\d{17,}/g,
        (id) => `<@${id}>`
      );

      return {
        content: tldr,
      };
    };

    c.event.waitUntil(
      followUpMessageEdit(
        getSummary(getMessagesOfChannel(interaction.channel_id, amount)),
        interaction.token
      )
    );

    return {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    };
  },
} as Command;
