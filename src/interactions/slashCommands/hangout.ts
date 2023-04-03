import type { Command } from "../../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "hangout",
    description: "Hangout",
  },

  execute: async (interaction, c) => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `I was gonna go hang with my fellow Regina.b0ts .... mais je vais vous manquer :clown:`,
      },
    };
  },
} as Command;
