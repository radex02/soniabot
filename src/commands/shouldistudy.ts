import type { Command } from "../types";
import { DiscordCommandOptionType } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { pickOne } from "../functions";

export default {
  manifest: {
    name: "shouldistudy",
    description: "Should I study ... ?",
    options: [
      {
        name: "subject",
        description: "Subject you wonder whether you should study",
        type: DiscordCommandOptionType.STRING,
        required: false,
      },
    ],
  },

  execute: async (interaction, c) => {
    const answer = pickOne([
      "yes",
      "YES",
      "you haven't already?!?",
      "yes – definitely",
      "without a doubt",
      "please do",
      "probably",
      "signs point to procrastination",
      "you'll regret it if you don't",
      "you know the answer",
    ]);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: answer,
      },
    };
  },
} as Command;
