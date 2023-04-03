import type { Command, DiscordMessage } from "../../types";
import { DiscordCommandOptionType, DiscordResponseMessage } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import {
  followUpMessageEdit,
  getMessagesOfChannel,
  getOptionValue,
} from "../../functions/discordApi";
import { makeInclusive, parseUserIds } from "../../functions/text";

export default {
  manifest: {
    name: "tldr",
    description: "Summarize the last message(s)",
    options: [
      {
        type: DiscordCommandOptionType.INTEGER,
        name: "amount",
        description: "Number of messages to summarize (default is 1)",
        min_value: 1,
        max_value: 100,
      },
    ],
  },

  execute: async (interaction, c) => {
    if (!interaction.channel_id) throw new HTTPException(400);
    if (!NLPCLOUD_KEY) throw new HTTPException(500);

    const amount = getOptionValue(interaction.data?.options, "amount") || 1;

    const getSummary = async (
      messageList: Promise<DiscordMessage[]>
    ): Promise<Partial<DiscordResponseMessage>> => {
      const formatedConversation = messageList.then((list) =>
        list
          .map((msg) =>
            msg.content ? `${msg.author.id}: ${msg.content}` : null
          )
          .filter(Boolean)
          .reverse()
          .join("\n\n")
      );

      const apiResponse: { summary_text?: string } = await fetch(
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

      if (!apiResponse.summary_text)
        return {
          content: "*An error occured*",
        };

      const tldr = makeInclusive(parseUserIds(apiResponse.summary_text));

      return {
        content: tldr,
        allowed_mentions: {
          parse: [],
        },
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
