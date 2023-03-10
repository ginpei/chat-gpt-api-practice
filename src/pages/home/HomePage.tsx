import dynamic from "next/dynamic";
import {
  ChatHistoryContextProvider,
  useChatHistoryContextState,
} from "../../domains/chat/ChatHistoryContext";
import { loadChatLog } from "../../domains/chat/chatLogStore";
import { BasicHead } from "../../domains/globalUi/BasicHead";
import { HeadLine } from "../../domains/globalUi/HeadLine";
import {
  ChatGptApiContextProvider,
  useChatGptApiContextState,
} from "../../domains/openai/chatGptApiContext";
import { loadChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";

// to access localStorage in rendering
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
  const chatHistoryContextState = useChatHistoryContextState({
    messages: loadChatLog(),
    tokenUsage: 0,
  });

  return (
    <ChatGptApiContextProvider value={chatGptApiContextState}>
      <ChatHistoryContextProvider value={chatHistoryContextState}>
        <BasicHead />
        <style>{
          /*css*/ `
html,
body,
#__next {
  height: 100%;
}
      `
        }</style>
        <div className="HomePage h-full flex flex-col [html]:h-full">
          <HeadLine />
          <div className="overflow-hidden flex-grow [&>*]:h-full">
            <ChatSection />
          </div>
        </div>
      </ChatHistoryContextProvider>
    </ChatGptApiContextProvider>
  );
}
