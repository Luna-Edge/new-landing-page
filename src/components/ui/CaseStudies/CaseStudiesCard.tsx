"use client";

import { motion } from "framer-motion";
import styles from "./CaseStudiesCard.module.scss";
import { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface ParallaxCardProps {
  title: string;
  description: string;
  color: string;
  technologies: string[];
  achievements: string[];
  index: number;
  image: StaticImageData;
}

const CaseStudiesCard: FC<ParallaxCardProps> = ({
  title,
  description,
  technologies,
  achievements,
  index,
  color,
  image,
}) => {
  return (
    <motion.div
      className={styles.cardContainer}
      style={{ top: (index + 1) * 68 }}
    >
      <div className={styles.card} style={{ background: color }}>
        <div>
          <div className={styles.cardNumber}>{index + 1}</div>
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.cardDescription}>{description}</p>
          <div className={styles.cardTechnologies}>
            <div className={styles.cardSubTitle}>Technologies used</div>
            <p>{technologies.join(", ")}</p>
          </div>
          <Image className={styles.cardImage} src={image} alt={title} />
        </div>
        <div className={styles.cardRightSide}>
          <div>
            <div className={styles.cardSubTitle}>Achievements</div>
            <div className={styles.cardList}>
              {achievements.map((item, i) => (
                <div key={i} className={styles.cardListItem}>
                  <div className={styles.cardListMarker} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudiesCard;
