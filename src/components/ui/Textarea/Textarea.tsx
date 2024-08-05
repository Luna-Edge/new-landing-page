import { type TextareaHTMLAttributes } from "react";

import styles from "./Textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  rowsQuantity?: number;
};

const Textarea = ({
  label = "",
  placeholder,
  name,
  rowsQuantity = 5,
}: TextareaProps) => {
  return (
    <label className={styles.label}>
      {!!label ? <span className={styles.label_text}>{label}</span> : null}
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        name={name}
        rows={rowsQuantity}
      />
    </label>
  );
};

export default Textarea;
