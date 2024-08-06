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
  height = 24,
  width = 24,
  text,
  loading = "lazy",
}: ScrollingText) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        height={height}
        width={width}
        src={icon}
        alt={altText}
        loading={loading}
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default ScrollingText;
