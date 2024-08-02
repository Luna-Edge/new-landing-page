import { type ButtonHTMLAttributes, type ReactNode } from "react";

import classNames from "@/utils/classNames/classNames";

import styles from "./Button.module.scss";
import { BUTTON_TYPES } from "./constants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  handleButtonClick: () => void;
  isLarge?: boolean;
};

const Button = ({
  type = BUTTON_TYPES.BUTTON,
  children,
  isLarge = false,
  handleButtonClick,
}: ButtonProps) => {
  const buttonClasses = classNames(styles.button, {
    [styles.large]: isLarge,
  });

  return (
    <button onClick={handleButtonClick} type={type} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
