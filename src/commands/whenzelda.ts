import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";

export default {
  manifest: {
    name: "whenzelda",
    description: "When is Zelda?",
  },

  execute: async (interaction) => {
    const releaseDate = new Date(
      "Tue May 12 2023 00:00:00 GMT-0400 (Eastern Daylight Time)"
    );
    const now = new Date();
    const dayDifference = Math.floor(
      (releaseDate.getTime() - now.getTime()) / 86400000
    );

    const relativeTime = new Intl.RelativeTimeFormat("en-ca", {
      numeric: "auto",
    }).format(dayDifference, "days");

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            type: "rich",
            title: relativeTime,
            color: 0x49d59c,
            image: {
              url: "https://media.tenor.com/Her1iXFjd50AAAAC/botw2-itsdam0n.gif",
              height: 449,
              width: 498,
            },
          },
        ],
      },
    };
  },
} as Command;
