import type { CreateCompletionResponse } from "openai";

export interface ChatApiQuery {
  apiKey: string;
  prompt: string;
}

export interface ChatApiSuccessResponse {
  data: CreateCompletionResponse;
  ok: true;
}

export interface CreateCompletionErrorResponse {
  error: {
    code: null;
    message: string;
    param: null;
    type: string;
  };
}

/**
 * @see API Reference - OpenAI API https://platform.openai.com/docs/api-reference/completions
 */
export async function sendChatRequest(
  options: ChatApiQuery
): Promise<ChatApiSuccessResponse> {
  if (!options.apiKey) {
    throw new Error("`apiKey` is required");
  }

  const url = "https://api.openai.com/v1/completions";
  const init: RequestInit = {
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: options.prompt,
      temperature: 0.6,
      max_tokens: 150,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.apiKey}`,
    },
    method: "POST",
  };
  const res = await fetch(url, init);
  if (!res.ok) {
    const data: CreateCompletionErrorResponse = await res.json();
    throw new Error(`${data.error.message} (${data.error.type})`);
  }

  const data: CreateCompletionResponse = await res.json();
  return { data, ok: true };
}
