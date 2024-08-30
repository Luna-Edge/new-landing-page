import { v4 as uuidv4 } from "uuid";
import MoonIcon from "/public/icons/moon_icon.svg";
import { ComponentProps } from "react";
import ScrollingText from "../components/ScrollingText/ScrollingText";

interface IScrollingText extends ComponentProps<typeof ScrollingText> {
  id: string;
}

export const MARQUEE_SLIDES_INFORMATION: IScrollingText[] = Array.from({ length: 10 }, () => ({
  id: uuidv4(),
  icon: MoonIcon,
  text: "Push your business to the moon",
  altText: "Moon icon",
}));
