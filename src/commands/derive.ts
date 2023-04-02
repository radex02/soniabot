import type { Command } from "../types";
import { DiscordCommandOptionType } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { fixMath } from "../functions";

export default {
  manifest: {
    name: "derive",
    description: "Derivés are fun",
    options: [
      {
        name: "formule",
        description: "Formule pour laquelle on cherche la dérivé",
        type: DiscordCommandOptionType.STRING,
        required: true,
      },
    ],
  },

  execute: async (interaction, c) => {
    const formulaOptions = interaction.data?.options?.find(
      (e) => e.name === "formule"
    );
    const formula = formulaOptions?.value;

    if (!formula) return;

    const encodedFormula = encodeURIComponent(fixMath(formula));

    const derive: { expression: string; result: string } = await fetch(
      `https://newton.now.sh/api/v2/derive/${encodedFormula}`
    ).then((res) => res.json());

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `La dérivé de \`\`${derive.expression}\`\` est \`\`${derive.result}\`\``,
      },
    };
  },
} as Command;
