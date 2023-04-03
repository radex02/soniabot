import type { Command } from "../../types";
import { DiscordCommandOptionType } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import {
  followUpMessageEdit,
  getMessagesOfChannel,
  getOptionValue,
} from "../../functions/discordApi";
import { getSummaryMessage } from "../../functions/NLPCloud";

export default {
  manifest: {
    name: "tldr",
    description: "Summarize the last message(s)",
    options: [
      {
        type: DiscordCommandOptionType.INTEGER,
        name: "amount",
        description: "Number of messages to summarize (default is 20)",
        min_value: 1,
        max_value: 100,
      },
    ],
  },

  execute: async (interaction, c) => {
    if (!interaction.channel_id) throw new HTTPException(400);
    if (!NLPCLOUD_KEY) throw new HTTPException(500);

    const amount = getOptionValue(interaction.data?.options, "amount") || 20;

    c.event.waitUntil(
      followUpMessageEdit(
        getSummaryMessage(getMessagesOfChannel(interaction.channel_id, amount)),
        interaction.token
      )
    );

    return {
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    };
  },
} as Command;
