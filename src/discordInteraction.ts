import { Context } from "hono";
import { DiscordInteraction, InteractionResponse } from "./types";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import { COMMAND_LIST } from "./conf";
import { componentInteraction } from "./componentInteraction";

export const discordInteraction = async (c: Context) => {
  let interaction: DiscordInteraction;

  try {
    interaction = JSON.parse(c.get("rawBody"));
  } catch (e) {
    throw new HTTPException(400);
  }

  switch (interaction.type) {
    case InteractionType.PING: {
      return pingInteraction(c);
    }
    case InteractionType.APPLICATION_COMMAND: {
      const commandName = interaction.data?.name.toLowerCase();
      const command = COMMAND_LIST.find(
        (cmd) => cmd.manifest.name === commandName
      );

      if (command) return c.json(await command.execute(interaction));
      else
        throw new HTTPException(404, {
          message: "command not found",
        });
    }
    case InteractionType.MESSAGE_COMPONENT: {
      return c.json(await componentInteraction(interaction));
    }
  }
};

const pingInteraction = async (c: Context) => {
  return c.json<InteractionResponse>({ type: InteractionResponseType.PONG });
};
