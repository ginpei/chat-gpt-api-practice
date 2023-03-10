import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { noop } from "../function/noop";
import { ChatMessage } from "./ChatMessage";

export interface ChatHistoryContextValue {
  messages: ChatMessage[];
  tokenUsage: number;
}

export type ChatHistoryContextValueSetter = Dispatch<
  SetStateAction<ChatHistoryContextValue>
>;

export type ChatHistoryContextValueState = [
  ChatHistoryContextValue,
  ChatHistoryContextValueSetter
];

const ChatHistoryContext = createContext<ChatHistoryContextValueState>([
  createChatHistoryContextValue(),
  noop,
]);
ChatHistoryContext.displayName = "ChatHistoryContext";

export const ChatHistoryContextProvider = ChatHistoryContext.Provider;

export function createChatHistoryContextValue(
  init?: Partial<ChatHistoryContextValue>
): ChatHistoryContextValue {
  return {
    messages: init?.messages ?? [],
    tokenUsage: init?.tokenUsage ?? 0,
  };
}

export function useChatHistoryContextState(
  initialState: ChatHistoryContextValue
): ChatHistoryContextValueState {
  return useState(initialState);
}

export function useChatHistoryContext(): [
  ChatHistoryContextValue,
  ChatHistoryContextValueSetter
] {
  return useContext(ChatHistoryContext);
}
