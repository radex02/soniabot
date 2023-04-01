import { InteractionHandler } from "./types";
import { HTTPException } from "hono/http-exception";
import quizAnswer from "./componentInteractions/quizAnswer";

export const componentInteraction: InteractionHandler = async (interaction) => {
  if (!interaction.data) throw new HTTPException(400);

  if (interaction.data.custom_id?.startsWith("ans-")) {
    return await quizAnswer(interaction);
  } else {
    throw new HTTPException(400);
  }
};
