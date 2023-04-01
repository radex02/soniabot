import { Context } from "hono";
import { COMMAND_LIST } from "./conf";

export const registerCommands = async (c: Context) => {
  const url = `https://discord.com/api/v10/applications/${c.env.DISCORD_APPLICATION_ID}/commands`;

  const commandDeclarations = COMMAND_LIST.map((command) => command.manifest);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${c.env.DISCORD_TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(commandDeclarations),
  });
  if (response.ok) return c.json(commandDeclarations.map((cmd) => cmd.name));
  else return c.text(await response.text());
};
