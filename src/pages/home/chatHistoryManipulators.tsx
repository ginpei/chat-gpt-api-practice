import { useCallback } from "react";
import {
  createChatHistoryContextValue,
  useChatHistoryContext,
} from "../../domains/chat/ChatHistoryContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";

export function useClearChatHistoryAction(): () => void {
  const [, setHistory] = useChatHistoryContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveHistoryLog(createChatHistoryContextValue());
    setHistory(createChatHistoryContextValue());
  }, [setHistory]);

  return action;
}
