"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

import classNames from "@/utils/classNames/classNames";

import styles from "./Button.module.scss";
import { BUTTON_TYPES } from "./constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLarge?: boolean;
}

const Button = ({
  type = BUTTON_TYPES.BUTTON,
  children,
  isLarge = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, {
        [styles.large]: isLarge,
        className,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
