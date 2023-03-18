import { useCallback } from "react";
import {
  createUserAssetContextValue,
  useUserAssetContext,
} from "../../domains/chat/UserAssetContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";

export function useClearChatHistoryAction(): () => void {
  const [, setUserAsset] = useUserAssetContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveHistoryLog(createUserAssetContextValue());
    setUserAsset(createUserAssetContextValue());
  }, [setUserAsset]);

  return action;
}
