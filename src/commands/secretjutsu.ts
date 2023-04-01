import type { Command } from "../types";
import { DiscordCommandOptionType } from "../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "secretjutsu",
    description: "Secret Jutsu",
    options: [
      {
        name: "victim",
        description: "Who's the victim?",
        type: DiscordCommandOptionType.USER,
        required: true,
      },
    ],
  },

  execute: async (interaction) => {
    const victim = interaction.data?.options?.find(
      (e) => e.name === "victim"
    )!.value;

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `<@${interaction.member?.user.id}> uses secret jutsu on <@${victim}>`,
        allowed_mentions: {
          users: [victim],
        },
        embeds: [
          {
            type: "rich",
            color: 0x994322,
            image: {
              url: "https://media.tenor.com/6QVaLSvuJJMAAAAC/naruto-secretfingerjitsu.gif",
              width: 498,
              height: 494,
            },
          },
        ],
      },
    };
  },
} as Command;