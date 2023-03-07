import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactNode } from "react";
import { useChatGptApiKey } from "../../domains/openai/chatGptApiKeyHooks";

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
  const key = useChatGptApiKey();

  if (key === undefined) {
    return (
      <Frame>
        <></>
      </Frame>
    );
  }

  return (
    <Frame>
      <ChatGptApiKeyForm />
      <ChatSection />
    </Frame>
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
