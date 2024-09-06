import { forwardRef, type TextareaHTMLAttributes, memo } from "react";

import styles from "./Textarea.module.scss";
import classNames from "@/utils/classNames/classNames";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsQuantity?: number;
}

const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", ...props }, ref) => {
      return (
        <textarea
          className={classNames(styles.textarea, {}, [className])}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
