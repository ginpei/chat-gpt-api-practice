// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createOpenAiApi } from "../../src/domains/openai/openai";

export interface ChatApiQuery {
  apiKey: string;
  prompt: string;
}

export type ChatApiResponse = ChatApiSuccessResponse | ChatApiErrorResponse;

export interface ChatApiSuccessResponse {
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
    // TODO fix any
    const query: any = req.body;
    console.log("# query", query);

    const api = createOpenAiApi(query.apiKey);
    const completion = await api.createCompletion({
      model: "text-davinci-003",
      prompt: query.prompt,
      temperature: 0.6,
    });
    console.log("# completion", completion);

    res.status(200).json({
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
