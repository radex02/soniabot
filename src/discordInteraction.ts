import { Context } from "hono";
import { DiscordInteraction } from "./types";
import { InteractionType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";
import componentInteraction from "./componentInteraction";
import commandInteraction from "./commandInteraction";
import pingInteraction from "./pingInteraction";

export const discordInteraction = async (c: Context) => {
  let interaction: DiscordInteraction;

  try {
    interaction = JSON.parse(c.get("rawBody"));
  } catch (e) {
    throw new HTTPException(400);
  }

  switch (interaction.type) {
    case InteractionType.PING: {
      return c.json(await pingInteraction(interaction));
    }
    case InteractionType.APPLICATION_COMMAND: {
      return c.json(await commandInteraction(interaction));
    }
    case InteractionType.MESSAGE_COMPONENT: {
      return c.json(await componentInteraction(interaction));
    }
    default: {
      throw new HTTPException(400, {
        message: "interaction type not implemented",
      });
    }
  }
};
