"use client";

import {
  type ButtonHTMLAttributes,
  MouseEventHandler,
  type ReactNode,
} from "react";

import classNames from "@/utils/classNames/classNames";

import styles from "./Button.module.scss";
import { BUTTON_TYPES } from "./constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLarge?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type = BUTTON_TYPES.BUTTON,
  children,
  className = "",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, {}, [className])}
    >
      {children}
    </button>
  );
};

export default Button;
