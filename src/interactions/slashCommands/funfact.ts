import type { Command } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { sanitize } from "../../functions/text";

export default {
  manifest: {
    name: "funfact",
    description: "Fun fact",
  },

  execute: async (interaction, c) => {
    const funfact: { text: string } = await fetch(
      "https://uselessfacts.jsph.pl/api/v2/facts/random"
    ).then((res) => res.json());

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: sanitize(funfact.text),
      },
    };
  },
} as Command;
