import { useCallback } from "react";
import { useUserAssetContext } from "../../domains/chat/UserAssetContext";
import { saveUserAsset } from "../../domains/chat/userAssetStore";
import { createUserAsset } from "../../domains/chat/UserAsset";

export function useClearChatHistoryAction(): () => void {
  const [, setUserAsset] = useUserAssetContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveUserAsset(createUserAsset());
    setUserAsset(createUserAsset());
  }, [setUserAsset]);

  return action;
}
