import classNames from "@/utils/classNames/classNames";
import styles from "./ServiceCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, memo, useState } from "react";
import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";

interface ServiceCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
  image?: {
    src: StaticImageData;
    styles?: CSSProperties;
  };
}

const ServiceCard = memo(
  ({ title, image, className = "", ...props }: ServiceCardProps) => {
    const [, isTablet, isDesktop] = useResponsive();
    const [isHover, setHover] = useState(false);

    const gradientVariants = {
      show: {
        background: [
          `conic-gradient(from 0deg, transparent 0deg, transparent 22.5deg, #1480ff 337.5deg, transparent 360deg)`,
          `conic-gradient(from -360deg, transparent 0deg, transparent 22.5deg, #1480ff 337.5deg, transparent 360deg)`,
        ],
        transition: {
          duration: 4,
          ease: "linear",
          repeat: Infinity,
        },
      },
      hide: {
        background: "transparent",
      },
    };

    return (
      <div
        className={styles.container}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <motion.div
          variants={gradientVariants}
          style={{
            zIndex: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: isTablet || isDesktop ? 32 : 16,
          }}
          initial="hide"
          animate={isHover ? "show" : "hide"}
        ></motion.div>
        <button
          className={classNames(styles.service_card, { className })}
          {...props}
        >
          {title && <h2 className={styles.title}>{title}</h2>}
          {image?.src && (
            <Image
              src={image.src}
              style={image.styles}
              alt={`${title} image`}
            />
          )}
        </button>
      </div>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
