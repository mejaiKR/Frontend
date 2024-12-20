import { atom } from "recoil";

export const searchInputValueState = atom({
  key: "searchInputValueState",
  default: "",
});

export const isVisibleDropdownState = atom({
  key: "isVisibleDropdownState",
  default: false,
});
