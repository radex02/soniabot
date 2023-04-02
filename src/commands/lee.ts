import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { pickOne, sanitize } from "../functions";

export default {
  manifest: {
    name: "lee",
    description: "Rock Lee my beloved",
  },

  execute: async (interaction, c) => {
    const quote: { quote: string } = await fetch(
      "https://animechan.vercel.app/api/random/character?name=rock%20lee&anime=naruto"
    ).then((res) => res.json());

    const image = pickOne([
      "https://media.tenor.com/zEZONLgumY4AAAAC/naruto-squad.gif",
      "https://media.tenor.com/-OIRi7qkWbUAAAAC/power-of-youth-naruto.gif",
      "https://media.tenor.com/hxAHHEn3pUwAAAAC/rock-lee-anime.gif",
      "https://media.tenor.com/--EeHWlrDtcAAAAC/rock-lee-brows.gif",
      "https://media.tenor.com/JUUbWGzszucAAAAC/rock-lee-thumbs-up.gif",
      "https://media.tenor.com/zJvANfC7hWgAAAAC/rock-lee.gif",
    ]);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            type: "rich",
            title: sanitize(quote.quote),
            color: 0x286a5e,
            image: {
              url: image,
            },
          },
        ],
      },
    };
  },
} as Command;
