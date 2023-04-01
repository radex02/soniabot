import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "protip",
    description: "Pro-tip",
  },

  execute: async (interaction) => {
    const adviceResponse: { slip: { advice: string } } = await fetch(
      "https://api.adviceslip.com/advice"
    ).then((res) => res.json());

    const advice = adviceResponse.slip.advice.includes(" lover")
      ? `A fool would say: ${adviceResponse.slip.advice}`
      : adviceResponse.slip.advice;

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: advice,
      },
    };
  },
} as Command;
