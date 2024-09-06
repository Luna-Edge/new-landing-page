"use client";

import {
  type ButtonHTMLAttributes,
  MouseEventHandler,
  type ReactNode,
  memo,
} from "react";

import classNames from "@/utils/classNames/classNames";

import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLarge?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = memo(
  ({ type = "button", children, className = "", ...props }: ButtonProps) => {
    return (
      <button
        type={type}
        className={classNames(styles.button, {}, [className])}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
