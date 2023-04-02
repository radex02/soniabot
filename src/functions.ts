import { decode } from "html-entities";
import { DiscordCommandOptionsResponse, DiscordMessage } from "./types";

export const shuffle = (source: any[]): any[] =>
  source
    .map((value) => ({ value: value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const pickOne = (source: any[]): any =>
  source[Math.floor(Math.random() * source.length)];

export const sanitize = (source: string): string =>
  decode(source).replaceAll(/\*\|_~`>/g, (char) => "\\" + char);

export const fixMath = (source: string | number): string =>
  source
    .toString()
    .replaceAll(
      /(cos|sin|log|ln|tan|acos|asin|atan)([\d.xy]+)/gi,
      (match, op, x) => `${op}(${x})`
    );

export const getMessagesOfChannel = async (
  channelId: string,
  limit: number | string
): Promise<DiscordMessage[]> => {
  return await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages?limit=${limit}`,
    {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
    }
  ).then((res) => res.json());
};

export const followUpMessageEdit = async (
  message: Promise<Partial<DiscordMessage>>,
  interactionToken: string
) => {
  await fetch(
    `https://discord.com/api/v10/webhooks/${DISCORD_APPLICATION_ID}/${interactionToken}/messages/@original`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
      body: JSON.stringify(await message),
    }
  );
};

export const getOptionValue = (
  options: DiscordCommandOptionsResponse[] | undefined,
  name: string
) => options?.find((e) => e.name === name)?.value;
