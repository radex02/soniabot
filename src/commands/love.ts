import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "love",
    description: "Love",
  },

  execute: async (interaction) => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "<$",
      },
    };
  },
} as Command;