import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { noop } from "../function/noop";

export interface ChatGptApiContextValue {
  apiKey: string;
}

export type ChatGptApiContextValueSetter = Dispatch<
  SetStateAction<ChatGptApiContextValue>
>;

export type ChatGptApiContextValueState = [
  ChatGptApiContextValue,
  ChatGptApiContextValueSetter
];

const ChatGptApiContext = createContext<ChatGptApiContextValueState>([
  createChatGptApiContextValue(),
  noop,
]);
ChatGptApiContext.displayName = "ChatGptApiContext";

export const ChatGptApiContextProvider = ChatGptApiContext.Provider;

export function createChatGptApiContextValue(
  init?: Partial<ChatGptApiContextValue>
): ChatGptApiContextValue {
  return {
    apiKey: init?.apiKey ?? "",
  };
}

export function useChatGptApiContextState(
  initialState: ChatGptApiContextValue
): ChatGptApiContextValueState {
  return useState(initialState);
}

export function useChatGptApiContext(): [
  ChatGptApiContextValue,
  ChatGptApiContextValueSetter
] {
  return useContext(ChatGptApiContext);
}
