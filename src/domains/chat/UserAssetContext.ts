import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { noop } from "../function/noop";
import { ChatMessage } from "./ChatMessage";

export interface UserAssetContextValue {
  messages: ChatMessage[];
  completionTokenUsage: number;
}

export type UserAssetContextValueSetter = Dispatch<
  SetStateAction<UserAssetContextValue>
>;

export type UserAssetContextValueState = [
  UserAssetContextValue,
  UserAssetContextValueSetter
];

const UserAssetContext = createContext<UserAssetContextValueState>([
  createUserAssetContextValue(),
  noop,
]);
UserAssetContext.displayName = "UserAssetContext";

export const UserAssetContextProvider = UserAssetContext.Provider;

export function createUserAssetContextValue(
  init?: Partial<UserAssetContextValue>
): UserAssetContextValue {
  return {
    messages: init?.messages ?? [],
    completionTokenUsage: init?.completionTokenUsage ?? 0,
  };
}

export function useUserAssetContextState(
  initialState: UserAssetContextValue
): UserAssetContextValueState {
  return useState(initialState);
}

export function useUserAssetContext(): [
  UserAssetContextValue,
  UserAssetContextValueSetter
] {
  return useContext(UserAssetContext);
}
