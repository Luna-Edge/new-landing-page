import { forwardRef, type InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";
import classNames from "@/utils/classNames/classNames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        className={classNames(styles.input, {}, [className])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
