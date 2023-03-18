import {
  createUserSettingsValue,
  UserSettingsValue,
} from "./UserSettingsContext";

const storeKey = "chat-gpt-api-practice/userSettings";
const oldStoreKeys = { r1: "chat-gpt-api-practice/apiKey" };

export function loadUserSettings(): UserSettingsValue {
  // SSR
  if (typeof window === "undefined") {
    return createUserSettingsValue();
  }

  const json = localStorage.getItem(storeKey);
  if (!json) {
    const json1 = localStorage.getItem(oldStoreKeys.r1);
    return createUserSettingsValue({
      apiKey: json1 ?? "",
    });
  }
  return createUserSettingsValue(JSON.parse(json ?? "{}"));
}

export function saveUserSettings(value: UserSettingsValue): void {
  const json = JSON.stringify(value);
  localStorage.setItem(storeKey, json);
}
