"use client";

import classNames from "@/utils/classNames/classNames";

import Image, { StaticImageData } from "next/image";

import styles from "./Card.module.scss";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  title: string;
  text: string;
  icon: StaticImageData;
}

const Card: React.FC<CardProps> = ({
  title,
  text,
  icon,
  className = "",
  ...props
}) => {
  const cardStyles = classNames(styles.card, {}, ["carrousel-card", className]);

  return (
    <article className={cardStyles} {...props}>
      <div className={styles.header}>
        <Image className={styles.image} src={icon} alt="Medal star" />
        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.text}>{text}</p>
    </article>
  );
};

export default Card;
