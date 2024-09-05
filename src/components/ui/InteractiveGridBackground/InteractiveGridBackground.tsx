import { HTMLMotionProps, motion } from "framer-motion";
import { HTMLAttributes, useRef } from "react";

import styles from "./InteractiveGridBackground.module.scss";
import classNames from "@/utils/classNames/classNames";

import useMousePosition from "@/hooks/useMousePosition";
import { useResponsive } from "@/hooks/useResponsive";

interface InteractiveGridBackgroundProps
  extends Omit<
    HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">,
    "children"
  > {
  /**
   * Line width of the grid lines
   *
   * @default 2
   */
  lineWidth?: number;
  /**
   * Size of each square
   *
   * @default 100
   */
  gridSize?: number;
  /**
   * Color of the grid lines
   *
   * @default #1480ff
   */
  gridColor?: string;
  /**
   * Size of the mask
   *
   * @default 500
   */
  maskSize?: number;
}

export default function InteractiveGridBackground({
  lineWidth = 2,
  gridSize = 100,
  gridColor = "#1480ff",
  maskSize = 500,
  className = "",
  ...props
}: InteractiveGridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, isTablet, isDesktop] = useResponsive();
  const { x, y } = useMousePosition(ref);

  const isVisible = !isDesktop;

  return (
    <motion.div
      ref={ref}
      className={classNames(styles.mask, {}, [className])}
      style={{
        opacity: isVisible || (x && y) ? 1 : 0,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg width="${gridSize}" height="${gridSize}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="${gridSize}" y2="0" stroke="${gridColor}" stroke-width="${lineWidth}" />
            <line x1="0" y1="0" x2="0" y2="${gridSize}" stroke="${gridColor}" stroke-width="${lineWidth}" />
          </svg>
        `)}")`,
        backgroundPosition: `-${lineWidth}px -${lineWidth}px`,
        WebkitMaskSize: isVisible ? "100%" : `${maskSize}px`,
      }}
      animate={{
        WebkitMaskPosition: isVisible
          ? "0 0"
          : `${x - maskSize / 2}px ${y - maskSize / 2}px`,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      {...props}
    ></motion.div>
  );
}
