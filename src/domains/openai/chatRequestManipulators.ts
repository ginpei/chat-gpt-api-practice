import {
  ChatApiErrorResponse,
  chatApiPath,
  ChatApiQuery,
} from "../../../pages/api/chat";

export async function sendChatRequest(options: ChatApiQuery): Promise<{}> {
  if (!options.apiKey) {
    throw new Error("`apiKey` is required");
  }

  const init: RequestInit = {
    body: JSON.stringify(options),
    method: "POST",
  };
  const res = await fetch(chatApiPath, init);
  if (!res.ok) {
    const errorBody: ChatApiErrorResponse = await res.json();
    throw new Error(errorBody.message);
  }
  const json = await res.json();
  console.log("# json", json);

  return {};
}
