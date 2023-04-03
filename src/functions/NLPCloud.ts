import { DiscordMessage, DiscordResponseMessage } from "../types";

export const getSummaryMessage = async (
  messageList: DiscordMessage[]
): Promise<Partial<DiscordResponseMessage>> => {
  const formattedConversation = formatConversation(await messageList);

  const summary = await summarizeConversation(formattedConversation);

  return {
    content: summary,
    allowed_mentions: {
      parse: [],
    },
  };
};

const formatConversation = (messageList: DiscordMessage[]): string =>
  messageList
    .map((msg) => (msg.content ? `${msg.author.id}: ${msg.content}` : null))
    .filter(Boolean)
    .reverse()
    .join("\n\n");

const summarizeConversation = async (conversation: string): Promise<string> => {
  const apiResponse: { summary_text?: string } = await fetch(
    "https://api.nlpcloud.io/v1/bart-large-samsum/summarization",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${NLPCLOUD_KEY}`,
      },
      body: JSON.stringify({
        text: conversation,
      }),
    }
  ).then((res) => res.json());

  return apiResponse.summary_text
    ? apiResponse.summary_text
    : "*An error occurred*";
};
