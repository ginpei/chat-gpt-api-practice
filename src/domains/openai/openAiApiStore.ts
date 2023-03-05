import { Configuration, OpenAIApi } from "openai";

const apiMap = new Map<string, OpenAIApi>();

export function getOpenAiApi(apiKey: string): OpenAIApi {
  const existing = apiMap.get(apiKey);
  if (existing) {
    return existing;
  }

  const api = createOpenAiApi(apiKey);
  apiMap.set(apiKey, api);
  return api;
}

function createOpenAiApi(apiKey: string): OpenAIApi {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  return openai;
}
