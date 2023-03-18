import { useCallback } from "react";
import { createUserAssets } from "../../domains/userAssets/UserAssets";
import { useUserAssetsContext } from "../../domains/userAssets/UserAssetsContext";
import { saveUserAssets } from "../../domains/userAssets/userAssetsStore";

export function useClearChatHistoryAction(): () => void {
  const [, setUserAssets] = useUserAssetsContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveUserAssets(createUserAssets());
    setUserAssets(createUserAssets());
  }, [setUserAssets]);

  return action;
}
