import {
  ChatApiErrorResponse,
  chatApiPath,
  ChatApiQuery,
} from "../../../pages/api/chat";

export interface ChatResponse {
  message: string;
}

export async function sendChatRequest(
  options: ChatApiQuery
): Promise<ChatResponse> {
  if (!options.apiKey) {
    throw new Error("`apiKey` is required");
  }

  const init: RequestInit = {
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };
  const res = await fetch(chatApiPath, init);
  if (!res.ok) {
    const errorBody: ChatApiErrorResponse = await res.json();
    throw new Error(errorBody.message);
  }

  // TODO
  const data: any = await res.json();

  return { message: data.message };
}
