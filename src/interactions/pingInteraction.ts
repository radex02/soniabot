import { InteractionHandler } from "../types";
import { InteractionResponseType } from "discord-interactions";

const pingInteraction: InteractionHandler = async () => {
  return { type: InteractionResponseType.PONG };
};

export default pingInteraction;
