import { atom } from "recoil";

export const currentPageState = atom<number>({
  key: "currentPageState",
  default: 1,
});

export const entriesPerPageState = atom<number>({
  key: "entriesPerPageState",
  default: 10,
});

export const selectedValueState = atom<string>({
  key: "selectedValueState",
  default: "continent-currency",
});

export const selectedContinentState = atom<string>({
  key: "selectedContinentState",
  default: "",
});

export const selectedCurrencyState = atom<string>({
  key: "selectedCurrencyState",
  default: "",
});

export const countryCodeState = atom<string>({
  key: "countryCodeState",
  default: "",
});
