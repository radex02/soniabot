import { InteractionHandler } from "./types";
import { COMMAND_LIST } from "./conf";
import { HTTPException } from "hono/http-exception";

const commandInteraction: InteractionHandler = async (interaction, c) => {
  const commandName = interaction.data?.name.toLowerCase();
  const command = COMMAND_LIST.find((cmd) => cmd.manifest.name === commandName);

  if (command) return command.execute(interaction, c);
  else
    throw new HTTPException(404, {
      message: "command not found",
    });
};

export default commandInteraction;
