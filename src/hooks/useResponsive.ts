import { useMediaQuery } from "usehooks-ts";
import SCSSVariables from "@/styles/variables.module.scss";
import { parsePixelValue } from "@/utils/functions";

export const useResponsive = () => {
  return [
    useMediaQuery(`(min-width: ${SCSSVariables["phone-width"]})`),
    useMediaQuery(`(min-width: ${SCSSVariables["tablet-width"]})`),
    useMediaQuery(`(min-width: ${SCSSVariables["desktop-width"]})`),
    {
      phone: parsePixelValue(SCSSVariables["phone-width"]),
      tablet: parsePixelValue(SCSSVariables["tablet-width"]),
      desktop: parsePixelValue(SCSSVariables["desktop-width"]),
    },
  ] as const;
};
