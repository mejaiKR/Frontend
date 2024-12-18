import { atom } from "recoil";

import { ViewType } from "@/types";

export const searchInputValueState = atom({
  key: "searchInputValueState",
  default: "",
});

export const isVisibleDropdownState = atom({
  key: "isVisibleDropdownState",
  default: false,
});

export const viewTypeState = atom<ViewType>({
  key: "viewTypeState",
  default: "mejai",
});
