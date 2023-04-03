import type { Command } from "../../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "laugh",
    description: "Laugh",
  },

  execute: async (interaction, c) => {
    const laughSize = 8 + Math.floor(Math.random() * 8);
    let laugh = "nye";
    for (let i = 0; i < laughSize; i++) {
      const length = laugh.length;
      if (i >= 2 && laugh.charAt(length - 1) === laugh.charAt(length - 2)) {
        laugh += laugh.charAt(length - 1) === "e" ? "h" : "e";
      } else {
        laugh += Math.random() > 0.5 ? "e" : "h";
      }
    }

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `***${laugh}***`,
      },
    };
  },
} as Command;
