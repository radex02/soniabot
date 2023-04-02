import type { Command, DiscordMessage } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import { followUpMessageEdit, getMessagesOfChannel } from "../functions";

export default {
  manifest: {
    name: "tldr",
    description: "[BETA] summarize the last 100 messages",
  },

  execute: async (interaction, c) => {
    if (!interaction.channel_id) throw new HTTPException(400);
    if (!NLPCLOUD_KEY) throw new HTTPException(500);

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
        /\d{16,}/g,
        (id) => `<@${id}>`
      );

      return {
        content: tldr,
      };
    };

    c.event.waitUntil(
      followUpMessageEdit(
        getSummary(getMessagesOfChannel(interaction.channel_id, 100)),
        interaction.token
      )
    );

    return {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    };
  },
} as Command;
