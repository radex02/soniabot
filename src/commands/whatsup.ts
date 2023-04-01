import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "whatsup",
    description: "What's up?",
  },

  execute: async (interaction) => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "The ceiling",
      },
    };
  },
} as Command;
