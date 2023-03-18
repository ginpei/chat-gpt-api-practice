import { useCallback } from "react";
import { useUserAssetContext } from "../../domains/chat/UserAssetContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { createUserAsset } from "../../domains/chat/UserAsset";

export function useClearChatHistoryAction(): () => void {
  const [, setUserAsset] = useUserAssetContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveHistoryLog(createUserAsset());
    setUserAsset(createUserAsset());
  }, [setUserAsset]);

  return action;
}
