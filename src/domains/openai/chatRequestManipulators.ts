import type {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateImageRequest,
  ImagesResponse,
} from "openai";

export interface ChatRequestQuery {
  apiKey: string;
  prompt: string;
}

export interface ChatRequestResponse {
  data: CreateCompletionResponse;
  ok: true;
}

export interface ImageRequestQuery {
  apiKey: string;
  prompt: string;
}

export interface ImageRequestResponse {
  data: ImagesResponse;
  ok: true;
}

// (Is there an official type?)
export interface CreateCompletionErrorResponse {
  error: {
    code: null;
    message: string;
    param: null;
    type: string;
  };
}

/**
 * @see https://platform.openai.com/docs/api-reference/completions
 */
export async function sendChatRequest(
  options: ChatRequestQuery
): Promise<ChatRequestResponse> {
  if (!options.apiKey) {
    throw new Error("`apiKey` is required");
  }

  const url = "https://api.openai.com/v1/completions";
  const init: RequestInit = {
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: options.prompt,
      temperature: 0.6,
      max_tokens: 500, // TODO have option
    } satisfies CreateCompletionRequest),
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

/**
 * @see https://platform.openai.com/docs/api-reference/images/create
 */
export async function sendImageRequest(
  options: ImageRequestQuery
): Promise<ImageRequestResponse> {
  if (!options.apiKey) {
    throw new Error("`apiKey` is required");
  }

  const url = "https://api.openai.com/v1/images/generations";
  const init: RequestInit = {
    body: JSON.stringify({
      prompt: options.prompt,
      size: "256x256",
    } satisfies CreateImageRequest),
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

  const data: ImagesResponse = await res.json();
  return { data, ok: true };
}
