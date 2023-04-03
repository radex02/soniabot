import type { Command } from "../../types";
import { DiscordCommandOptionType } from "../../types";
import { InteractionResponseType } from "discord-interactions";
import { getOptionValue } from "../../functions";

export default {
  manifest: {
    name: "whatis",
    description: "What is ...?",
    options: [
      {
        name: "thing",
        description: "Thing for which you want to find out what it is",
        type: DiscordCommandOptionType.STRING,
        required: true,
      },
    ],
  },

  execute: async (interaction, c) => {
    const searchTerm = getOptionValue(interaction.data?.options, "thing");

    if (!searchTerm) return;

    const encodedTerm = encodeURIComponent(searchTerm);

    const apiResponse: UrbanDictionaryApiResponse = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${encodedTerm}`
    ).then((res) => res.json());

    if (apiResponse.list.length < 1)
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `No definition for "${searchTerm}"`,
        },
      };

    const definition: UrbanDictionaryDefinition = apiResponse.list[0];

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            type: "rich",
            title: `Definition of "${searchTerm}"`,
            url: `https://www.urbandictionary.com/define.php?term=${encodedTerm}`,
            description: sanitizeUrbanDict(definition.definition),
            color: 0xefff00,
            fields: definition.example
              ? [
                  {
                    name: "Example",
                    value: sanitizeUrbanDict(definition.example),
                  },
                ]
              : [],
          },
        ],
      },
    };
  },
} as Command;

const sanitizeUrbanDict = (source: string): string =>
  source.replaceAll(/\[([^\]]+)]/g, (match, word) => word);

interface UrbanDictionaryApiResponse {
  list: UrbanDictionaryDefinition[];
}

interface UrbanDictionaryDefinition {
  definition: string;
  example?: string;
  permaling: string;
  thumbs_up: number;
  thumbs_down: number;
  author: string;
  word: string;
  defid: number;
  current_vote?: string;
  written_on: string;
}
