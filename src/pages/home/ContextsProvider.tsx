import {
  ChatHistoryContextProvider,
  useChatHistoryContextState,
} from "../../domains/chat/ChatHistoryContext";
import { loadHistoryLog } from "../../domains/chat/chatLogStore";
import {
  UserSettingsProvider,
  useUserSettingsState,
} from "../../domains/userSettings/UserSettingsContext";
import { loadUserSettings } from "../../domains/userSettings/userSettingsStore";

export interface ContextsProviderProps {
  children: React.ReactNode;
}

export function ContextsProvider({
  children,
}: ContextsProviderProps): JSX.Element {
  const userSettingsState = useUserSettingsState(loadUserSettings());
  const chatHistoryContextState = useChatHistoryContextState(loadHistoryLog());

  return (
    <UserSettingsProvider value={userSettingsState}>
      <ChatHistoryContextProvider value={chatHistoryContextState}>
        {children}
      </ChatHistoryContextProvider>
    </UserSettingsProvider>
  );
}
