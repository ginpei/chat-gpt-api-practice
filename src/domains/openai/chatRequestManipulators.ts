import {
  ChatApiErrorResponse,
  chatApiPath,
  ChatApiQuery,
  ChatApiSuccessResponse,
} from "../../../pages/api/chat";

export async function sendChatRequest(
  options: ChatApiQuery
): Promise<ChatApiSuccessResponse> {
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

  const data: ChatApiSuccessResponse = await res.json();
  return data;
}
