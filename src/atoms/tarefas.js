import { atom } from "recoil";

export const tarefasState = atom({
  key: "tarefasState",
  default: []
});

export const filtroStatusState = atom({
  key: "filtroStatusState",
  default: "todas"
});

export const filtroTextoState = atom({
  key: "filtroTextoState",
  default: ""
});