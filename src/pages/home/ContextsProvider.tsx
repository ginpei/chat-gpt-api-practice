import {
  UserAssetContextProvider,
  useUserAssetContextState,
} from "../../domains/chat/UserAssetContext";
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
  const userAssetContextState = useUserAssetContextState(loadHistoryLog());

  return (
    <UserSettingsProvider value={userSettingsState}>
      <UserAssetContextProvider value={userAssetContextState}>
        {children}
      </UserAssetContextProvider>
    </UserSettingsProvider>
  );
}
