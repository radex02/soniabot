import type { Command } from "../types";
import { DiscordCommandOptionType } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { fixMath, getOptionValue } from "../functions";

export default {
  manifest: {
    name: "integrale",
    description: "Intégrale",
    options: [
      {
        name: "formule",
        description: "Formule pour laquelle on cherche l'intégrale",
        type: DiscordCommandOptionType.STRING,
        required: true,
      },
    ],
  },

  execute: async (interaction, c) => {
    const formula = getOptionValue(interaction.data?.options, "formule");

    if (!formula) return;

    const encodedFormula = encodeURIComponent(fixMath(formula));

    const integrate: { expression: string; result: string } = await fetch(
      `https://newton.now.sh/api/v2/integrate/${encodedFormula}`
    ).then((res) => res.json());

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `L'intégrale de \`\`${
          integrate.expression
        }\`\` est \`\`${integrate.result.replaceAll("log(", "ln(")}\`\``,
      },
    };
  },
} as Command;
