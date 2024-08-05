import { type InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({
  label = "",
  placeholder,
  name,
  type = "text",
}: InputProps) => {
  return (
    <label className={styles.label}>
      {!!label ? <span className={styles.label_text}>{label}</span> : null}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </label>
  );
};

export default Input;
