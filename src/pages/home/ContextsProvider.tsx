import { useState } from "react";
import { loadUserAsset } from "../../domains/chat/userAssetStore";
import { UserAssetContextProvider } from "../../domains/chat/UserAssetContext";
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
  const userAssetContextState = useState(loadUserAsset());

  return (
    <UserSettingsProvider value={userSettingsState}>
      <UserAssetContextProvider value={userAssetContextState}>
        {children}
      </UserAssetContextProvider>
    </UserSettingsProvider>
  );
}
