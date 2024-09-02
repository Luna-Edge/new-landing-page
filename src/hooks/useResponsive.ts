import { useMediaQuery } from "usehooks-ts";
import SCSSVariables from "@/styles/variables.module.scss";

export const useResponsive = () => {
  return [
    useMediaQuery(`(min-width: ${SCSSVariables["phone-width"]})`),
    useMediaQuery(`(min-width: ${SCSSVariables["tablet-width"]})`),
    useMediaQuery(`(min-width: ${SCSSVariables["desktop-width"]})`),
  ];
};