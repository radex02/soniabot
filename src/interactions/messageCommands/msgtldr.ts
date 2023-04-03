import type { Command, DiscordMessage } from "../../types";
import { DiscordCommandType } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import { followUpMessageEdit } from "../../functions/discordApi";
import { getSummaryMessage } from "../../functions/NLPCloud";

export default {
  manifest: {
    type: DiscordCommandType.MESSAGE,
    name: "TLDR",
    description: "",
  },

  execute: async (interaction, c) => {
    if (!interaction.channel_id) throw new HTTPException(400);
    if (!NLPCLOUD_KEY) throw new HTTPException(500);

    const resolvedMessageList = interaction.data!.resolved?.messages;

    if (!resolvedMessageList) throw new HTTPException(400);

    const messageList: DiscordMessage[] = [];

    for (const messageId in resolvedMessageList) {
      messageList.push(resolvedMessageList[messageId]);
    }

    c.event.waitUntil(
      followUpMessageEdit(getSummaryMessage(messageList), interaction.token)
    );

    return {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    };
  },
} as Command;
