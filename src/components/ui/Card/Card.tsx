"use client";

import classNames from "@/utils/classNames/classNames";

import styles from "./Card.module.scss";
import "./styles.scss";

type CardProps = {
  title: string;
  text: string;
};

const Card = ({ title, text }: CardProps) => {
  const cardStyles = classNames(styles.card, {}, ["carrousel-card"]);

  return (
    <div className={styles.card_wrapper}>
      <div className={cardStyles}>
        <div className={styles.symbol} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Card;
