import classNames from "@/utils/classNames/classNames";
import styles from "./ServiceCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, memo } from "react";

interface ServiceCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
  image?: {
    src: StaticImageData;
    styles?: CSSProperties;
  };
}

const ServiceCard = memo(({
  title,
  image,
  className = "",
  ...props
}: ServiceCardProps) => {
  return (
    <button
      className={classNames(styles.service_card, { className })}
      {...props}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {image?.src && (
        <Image src={image.src} style={image.styles} alt={`${title} image`} />
      )}
    </button>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
