import { useState } from "react";
import { UserAssetsContextProvider } from "../../domains/userAssets/UserAssetsContext";
import { loadUserAssets } from "../../domains/userAssets/userAssetsStore";
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
  const userAssetsContextState = useState(loadUserAssets());

  return (
    <UserSettingsProvider value={userSettingsState}>
      <UserAssetsContextProvider value={userAssetsContextState}>
        {children}
      </UserAssetsContextProvider>
    </UserSettingsProvider>
  );
}
