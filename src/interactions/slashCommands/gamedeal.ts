import type { Command } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { sanitize } from "../../functions/text";

export default {
  manifest: {
    name: "gamedeal",
    description: "Good deals :thumbsup:",
  },

  execute: async (interaction, c) => {
    const pageNumber = Math.floor(Math.random() * 25);

    const dealList: CheapsharkDeal[] = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?pageNumber=${pageNumber}&pageSize=1&upperPrice=30&onSale=1&storeID=1,4,5,7,8,13,25&metacritic=80`
    ).then((res) => res.json());

    const deal = dealList[0];

    const saving = Math.floor(parseInt(deal.savings));
    const fields = [];

    if (deal.steamRatingText)
      fields.push({
        name: "Steam rating",
        value: `${deal.steamRatingText}\n(${deal.steamRatingCount} reviews)`,
      });
    fields.push({
      name: "Metacritic score",
      value: deal.metacriticScore,
    });

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Here's a deal!",
        embeds: [
          {
            type: "rich",
            title: sanitize(deal.title),
            description: `**${saving}% off**\n~~${deal.normalPrice}~~ ${deal.salePrice}$`,
            color: 0x55ffaa,
            url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
            fields: fields,
            image: {
              url: deal.thumb,
            },
          },
        ],
      },
    };
  },
} as Command;

interface CheapsharkDeal {
  internalName: string;
  title: string;
  metacriticLink?: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice?: string;
  normalPrice: string;
  isOnSale?: "1" | "0";
  savings: string;
  metacriticScore?: string;
  steamRatingText?: string;
  steamRatingPercent?: string;
  steamRatingCount?: string;
  steamAppID?: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb?: string;
}
