// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateCompletionResponseChoicesInner } from "openai";
import { getOpenAiApi } from "../../src/domains/openai/openAiApiStore";

export interface ChatApiQuery {
  apiKey: string;
  prompt: string;
}

export type ChatApiResponse = ChatApiSuccessResponse | ChatApiErrorResponse;

export interface ChatApiSuccessResponse {
  response: CreateCompletionResponseChoicesInner[];
  ok: true;
}

export interface ChatApiErrorResponse {
  message: string;
  ok: false;
}

export const chatApiPath = "/api/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatApiResponse>
) {
  try {
    const query: any = req.body;

    const api = getOpenAiApi(query.apiKey);
    const { data } = await api.createCompletion({
      model: "text-davinci-003",
      prompt: query.prompt,
      temperature: 0.6,
    });

    const result = data.choices;
    if (!result) {
      throw new Error(`API returned an empty text`);
    }

    res.status(200).json({
      response: result,
      ok: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      responseError(res, `${error.name}: ${error.message}`);
    } else {
      console.error(error);
      responseError(res, "Unknown error (This should be a bug)");
    }
  }
}

function responseError(
  res: NextApiResponse,
  message: string,
  code = 500
): void {
  res.status(code).json({ message, ok: false });
}
