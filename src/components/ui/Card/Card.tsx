"use client";

import classNames from "@/utils/classNames/classNames";

import Image from "next/image";
import MedalStar from '../../../../public/icons/medal_star.svg';

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
        <Image className={styles.image} src={MedalStar} alt="Medal star" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Card;
