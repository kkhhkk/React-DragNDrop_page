import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const showState = atom({
  key: "show",
  default: false,
});

export const modeState = atom({
  key: "mode",
  default: true,
});

export const editShowState = atom({
  key: "editshow",
  default: false,
});

export const edittagetState = atom({
  key: "editTargetId",
  default: "",
});
