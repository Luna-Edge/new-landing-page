import Image from "next/image";

import styles from "./ScrollingText.module.scss";

type ScrollingText = {
  height?: number;
  width?: number;
  icon: string;
  loading?: "lazy" | "eager";
  altText: string;
  text: string;
};

const ScrollingText = ({
  altText,
  icon,
  text,
  loading = "lazy",
}: ScrollingText) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={icon}
        alt={altText}
        loading={loading}
      />
      <p className={styles.text}>{text}</p>
      <div />
    </div>
  );
};

export default ScrollingText;
