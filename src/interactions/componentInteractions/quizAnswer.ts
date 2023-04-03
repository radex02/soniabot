import {
  DiscordComponent,
  DiscordEmbed,
  InteractionHandler,
} from "../../types";
import { InteractionResponseType } from "discord-interactions";

const quizAnswer: InteractionHandler = async (interaction) => {
  const match = interaction.data!.custom_id?.match(/^ans-(\d+)-(.+)$/);
  const id = match?.[1];
  const goodAnswer = match?.[2];

  if (goodAnswer === "false")
    return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };

  const newEmbed: DiscordEmbed = Object.assign(interaction.message!.embeds[0], {
    description: interaction.member
      ? `Solved by <@${interaction.member.user.id}>`
      : undefined,
    color: 0x853ae0,
  });

  const newComponent: DiscordComponent = {
    type: 1,
    components: interaction.message?.components![0].components!.map((comp) => {
      if (comp.custom_id === interaction.data!.custom_id)
        return Object.assign(comp, { disabled: true, style: 1 });
      else return Object.assign(comp, { disabled: true });
    }),
  };

  return {
    type: InteractionResponseType.UPDATE_MESSAGE,
    data: {
      embeds: [newEmbed],
      components: [newComponent],
    },
  };
};

export default quizAnswer;
