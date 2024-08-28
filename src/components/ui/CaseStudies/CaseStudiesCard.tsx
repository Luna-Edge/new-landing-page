"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import styles from "./CaseStudiesCard.module.scss";

interface ParallaxCardProps {
  title: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  range: number[];
  progress: MotionValue<number>;
  targetScale: number;
  index: number;
}

const CaseStudiesCard: React.FC<ParallaxCardProps> = ({
  title,
  description,
  technologies,
  responsibilities,
  achievements,
  index,
  range,
  progress,
  targetScale,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <motion.div
      className={styles.cardContainer}
      style={{ scale, top: (index + 1) * 67 }}
    >
      <div className={styles.card}>
        <div>
          <div className={styles.cardNumber}>{index + 1}</div>
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.cardDescription}>{description}</p>
          <div className={styles.cardTechnologies}>
            <div className={styles.cardSubTitle}>Technologies used</div>
            <p>{technologies.join(", ")}</p>
          </div>
          <div className={styles.cardImage} />
        </div>
        <div className={styles.cardRightSide}>
          <div>
            <div className={styles.cardSubTitle}>Responsibilities</div>
            <div className={styles.cardList}>
              {responsibilities.map((item, i) => (
                <div key={i} className={styles.cardListItem}>
                  <div className={styles.cardListMarker} />
                  {item}
                </div>
              ))}
            </div>
          </div>
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
