import { DiscordComponent, DiscordEmbed, InteractionHandler } from "./types";
import { InteractionResponseType } from "discord-interactions";
import { HTTPException } from "hono/http-exception";

export const componentInteraction: InteractionHandler = async (interaction) => {
  if (!interaction.data) throw new HTTPException(400);

  if (interaction.data.custom_id?.startsWith("ans-")) {
    const match = interaction.data.custom_id?.match(/^ans-(\d+)-(.+)$/);
    const id = match?.[1];
    const goodAnswer = match?.[2];

    if (goodAnswer === "false")
      return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };

    const newEmbed: DiscordEmbed = Object.assign(
      interaction.message!.embeds[0],
      {
        description: `Solved by <@${interaction.member?.user.id}>`,
        color: 0x853ae0,
      }
    );

    const newComponent: DiscordComponent = {
      type: 1,
      components: interaction.message?.components![0].components!.map(
        (comp) => {
          if (comp.custom_id === interaction.data!.custom_id)
            return Object.assign(comp, { disabled: true, style: 1 });
          else return Object.assign(comp, { disabled: true });
        }
      ),
    };

    return {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        embeds: [newEmbed],
        components: [newComponent],
      },
    };
  } else throw new HTTPException(400);
};
