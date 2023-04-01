import { DiscordInteraction, InteractionHandler } from "./types";
import { COMMAND_LIST } from "./conf";
import { HTTPException } from "hono/dist/types/http-exception";

const commandInteraction: InteractionHandler = async (
  interaction: DiscordInteraction
) => {
  const commandName = interaction.data?.name.toLowerCase();
  const command = COMMAND_LIST.find((cmd) => cmd.manifest.name === commandName);

  if (command) return command.execute(interaction);
  else
    throw new HTTPException(404, {
      message: "command not found",
    });
};

export default commandInteraction;
