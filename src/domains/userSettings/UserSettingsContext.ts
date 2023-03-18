import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { noop } from "../function/noop";

export interface UserSettingsValue {
  apiKey: string;
  renderMarkdown: boolean;
}

export type UserSettingsValueSetter = Dispatch<
  SetStateAction<UserSettingsValue>
>;

export type UserSettingsValueState = [
  UserSettingsValue,
  UserSettingsValueSetter
];

const UserSettingsContext = createContext<UserSettingsValueState>([
  createUserSettingsValue(),
  noop,
]);
UserSettingsContext.displayName = "UserSettings";

export const UserSettingsProvider = UserSettingsContext.Provider;

export function createUserSettingsValue(
  init?: Partial<UserSettingsValue>
): UserSettingsValue {
  return {
    apiKey: init?.apiKey ?? "",
    renderMarkdown: init?.renderMarkdown ?? true,
  };
}

export function useUserSettingsState(
  initialState: UserSettingsValue
): UserSettingsValueState {
  return useState(initialState);
}

export function useUserSettings(): [
  UserSettingsValue,
  UserSettingsValueSetter
] {
  return useContext(UserSettingsContext);
}
