import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { noop } from "../function/noop";
import { createUserAsset, UserAsset } from "./UserAsset";

export type UserAssetContextValueSetter = Dispatch<SetStateAction<UserAsset>>;

export type UserAssetContextValueState = [
  UserAsset,
  UserAssetContextValueSetter
];

const UserAssetContext = createContext<UserAssetContextValueState>([
  createUserAsset(),
  noop,
]);
UserAssetContext.displayName = "UserAssetContext";

export const UserAssetContextProvider = UserAssetContext.Provider;

export function useUserAssetContext(): UserAssetContextValueState {
  return useContext(UserAssetContext);
}
