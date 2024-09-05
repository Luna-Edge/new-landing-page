import { forwardRef, HTMLAttributes, useMemo } from "react";
import styles from "./ArrowButton.module.scss";

import Image from "next/image";
import ArrowRight from "@/../public/icons/arrow-right.svg";
import classNames from "@/utils/classNames/classNames";

interface ArrowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right" | "bottom" | "top";
}

const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ direction, className = "", ...props }, ref) => {
    const rotateDeg = useMemo(() => {
      switch (direction) {
        case "left":
          return 180;
        case "bottom":
          return -90;
        case "top":
          return 90;
        default:
          return 0;
      }
    }, [direction]);

    return (
      <button
        ref={ref}
        className={classNames(styles.button, {}, [className])}
        {...props}
      >
        <Image
          className={styles.icon}
          src={ArrowRight}
          alt={`Arrow ${direction}`}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
        />
      </button>
    );
  },
);

ArrowButton.displayName = "ArrowButton";

export default ArrowButton;
