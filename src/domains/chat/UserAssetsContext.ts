import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { noop } from "../function/noop";
import { createUserAssets, UserAssets } from "./UserAssets";

export type UserAssetsContextValueSetter = Dispatch<SetStateAction<UserAssets>>;

export type UserAssetsContextValueState = [
  UserAssets,
  UserAssetsContextValueSetter
];

const userAssetsContext = createContext<UserAssetsContextValueState>([
  createUserAssets(),
  noop,
]);
userAssetsContext.displayName = "UserAssetsContext";

export const UserAssetsContextProvider = userAssetsContext.Provider;

export function useUserAssetsContext(): UserAssetsContextValueState {
  return useContext(userAssetsContext);
}
