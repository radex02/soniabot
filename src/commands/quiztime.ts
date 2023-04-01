import type { Command } from "../types";
import { InteractionResponseType } from "discord-interactions";
import { pickOne, sanitize, shuffle } from "../functions";

export default {
  manifest: {
    name: "quiztime",
    description: "Quiz time!",
  },

  execute: async (interaction) => {
    const category = pickOne([
      17, // science and nature
      19, // science : math
    ]);

    const quizList: QuizApiResponse = await fetch(
      `https://opentdb.com/api.php?amount=1&category=${category}`
    ).then((res) => res.json());

    const quiz = quizList.results[0];

    const correctAnswer = sanitize(quiz.correct_answer);

    const allAnswers: string[] = shuffle([
      ...quiz.incorrect_answers.map((a) => sanitize(a)),
      correctAnswer,
    ]);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            type: "rich",
            title: sanitize(quiz.question),
            color: 0x000000,
          },
        ],
        components: [
          {
            type: 1,
            components: allAnswers.map((ans, i) => ({
              type: 2,
              style: 2,
              label: ans,
              custom_id: `ans-${i}-${ans === correctAnswer}`,
            })),
          },
        ],
      },
    };
  },
} as Command;

interface QuizApiResponse {
  results: [
    {
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }
  ];
}
