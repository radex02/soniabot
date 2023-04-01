import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { pickOne } from "../functions";

export default {
  manifest: {
    name: "costco",
    description: "Costco",
  },

  execute: async (interaction) => {
    const image = pickOne([
      "https://media.giphy.com/media/8coEmqQxL39eMJcey0/giphy.gif",
      "https://tenor.com/view/pizza-costco-pizza-costco-welcome-to-costco-i-love-you-gif-gif-gif-25786468",
      "https://tenor.com/view/faizal-faizal-khamisa-khamisa-costco-member-gif-27532807",
      "https://tenor.com/view/costco-is-living-a-life-gif-9694046",
      "https://tenor.com/view/costco-gif-18578393",
      "https://tenor.com/view/costco-hot-dog-metal-gear-rising-gif-25828041",
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjI3NDM3MTgyYTIxYzVlNmU1Y2I1NmFiYWRjYzU2N2Y4NTVhYTJjNCZjdD1n/J1vL7sY4xP5gIDCcdV/giphy.gif",
    ]);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: image,
      },
    };
  },
} as Command;
