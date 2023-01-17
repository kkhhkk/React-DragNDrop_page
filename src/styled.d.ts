import "styled-components";
import { darkTheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    cardTextColor: string;
    cardColor: string;
    boardColor: string;
  }
}
