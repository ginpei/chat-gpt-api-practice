import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactNode } from "react";
import {
  ChatGptApiContextProvider,
  useChatGptApiContextState,
} from "../../domains/openai/chatGptApiContext";
import { loadChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";

// to access localStorage in rendering
const ChatGptApiKeyForm = dynamic(
  () => import("./ChatGptApiKeyForm").then((mod) => mod.ChatGptApiKeyForm),
  {
    ssr: false,
  }
);
const ChatSection = dynamic(
  () => import("./ChatSection").then((mod) => mod.ChatSection),
  {
    ssr: false,
  }
);

export function HomePage(): JSX.Element {
  const chatGptApiContextState = useChatGptApiContextState({
    apiKey: loadChatGptApiKeyKey(),
  });

  return (
    <ChatGptApiContextProvider value={chatGptApiContextState}>
      <Frame>
        <ChatGptApiKeyForm />
        <ChatSection />
      </Frame>
    </ChatGptApiContextProvider>
  );
}

function Frame({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="HomePage m-4">
      <Head>
        <title>Home</title>
        <meta name="description" content="Practicing ChatGPT API" />
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <h1>ChatGPT API practice</h1>
      {children}
    </div>
  );
}
