import { InteractionHandler } from "./types";
import { HTTPException } from "hono/http-exception";
import quizAnswer from "./components/quizAnswer";

const componentInteraction: InteractionHandler = async (interaction, c) => {
  if (!interaction.data) throw new HTTPException(400);

  if (interaction.data.custom_id?.startsWith("ans-")) {
    return await quizAnswer(interaction, c);
  } else {
    throw new HTTPException(400);
  }
};

export default componentInteraction;
