import {
  ChatHistoryContextProvider,
  useChatHistoryContextState,
} from "../../domains/chat/ChatHistoryContext";
import { loadChatLog } from "../../domains/chat/chatLogStore";
import {
  ChatGptApiContextProvider,
  useChatGptApiContextState,
} from "../../domains/openai/chatGptApiContext";
import { loadChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";

export interface ContextsProviderProps {
  children: React.ReactNode;
}

export function ContextsProvider({
  children,
}: ContextsProviderProps): JSX.Element {
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
        {children}
      </ChatHistoryContextProvider>
    </ChatGptApiContextProvider>
  );
}
