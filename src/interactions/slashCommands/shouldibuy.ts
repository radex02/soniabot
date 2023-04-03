import type { Command } from "../../types";
import { DiscordCommandOptionType } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { pickOne } from "../../functions/random";

export default {
  manifest: {
    name: "shouldibuy",
    description: "Should I buy ... ?",
    options: [
      {
        name: "item",
        description: "Item you wonder whether you should buy",
        type: DiscordCommandOptionType.STRING,
        required: true,
      },
    ],
  },

  execute: async (interaction, c) => {
    const answer = pickOne([
      "no",
      "I feel like that's a bad financial decision",
      "NO.",
      "best not",
      "probably not",
      "not worth it",
      "you should save your money",
    ]);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: answer,
      },
    };
  },
} as Command;
