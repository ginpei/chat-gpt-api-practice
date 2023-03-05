import { Configuration, OpenAIApi } from "openai";

export function createOpenAiApi(apiKey: string) {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  return openai;
}
