import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { sanitize } from "../functions";

export default {
  manifest: {
    name: "joke",
    description: "Tell me a joke",
  },

  execute: async (interaction) => {
    const joke = await fetch(
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt"
    ).then((res) => res.text());

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: sanitize(joke),
      },
    };
  },
} as Command;
