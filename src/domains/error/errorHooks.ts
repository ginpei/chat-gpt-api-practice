import { Dispatch, SetStateAction, useState } from "react";

export function useError<T extends Error = Error>(): [
  T | null,
  Dispatch<SetStateAction<T | null>>
] {
  return useState<T | null>(null);
}
