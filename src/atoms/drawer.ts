import { atom } from "recoil";

export const drawerState = atom({
  key: "drawerState",
  default: false,
});

export const drawerWidthState = atom({
  key: "drawerWidthState",
  default: 250,
});
