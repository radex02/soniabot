import { DiscordCommandOptionsResponse, DiscordMessage } from "../types";

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
