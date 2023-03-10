import dynamic from "next/dynamic";
import { BasicHead } from "../../domains/globalUi/BasicHead";
import { HeadLine } from "../../domains/globalUi/HeadLine";
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
      <BasicHead />
      <div className="HomePage h-[100vh] flex flex-col">
        <HeadLine />
        <div className="overflow-hidden flex-grow [&>*]:h-full">
          <ChatSection />
        </div>
      </div>
    </ChatGptApiContextProvider>
  );
}
