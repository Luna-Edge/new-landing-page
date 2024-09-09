import { FC, useState, memo } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import styles from "./CaseStudiesCard.module.scss";
import ArrowButton from "@/components/ui/ArrowButton/ArrowButton";
import { useResponsive } from "@/hooks/useResponsive";
import Container from "@/components/ui/Container/Container";

interface ParallaxCardProps {
  title: string;
  description: string;
  color: string;
  technologies: string[];
  achievements: string[];
  index: number;
  image: StaticImageData;
}

const CaseStudiesCard: FC<ParallaxCardProps> = memo(
  ({ title, description, technologies, achievements, index, color, image }) => {
    const [isPhone, isTablet] = useResponsive();
    const [isOpenAchievements, setIsOpenAchievements] = useState(false);
    return (
      <div
        className={styles.cardContainer}
        style={{
          top: (index + 1) * 68,
        }}
      >
        <Container
          className={styles.borderContainer}
          borderColor={"linear-gradient(180deg, #C8DBF5 0%, #B9D5FB 100%)"}
          borderWidth={2}
        >
          <div className={styles.card} style={{ background: color }}>
            <div className={styles.cardMainInfo}>
              <div className={styles.cardNumber}>{index + 1}</div>
              <h1 className={styles.cardTitle}>{title}</h1>
              <p>{description}</p>
            </div>
            <div className={styles.cardTechnologies}>
              <div className={styles.cardSubTitle}>Technologies used</div>
              <p>{technologies.join(", ")}</p>
            </div>
            <div className={styles.cardImageContainer}>
              <Image className={styles.cardImage} src={image} alt={title} />
            </div>
            <div className={styles.cardAchievements}>
              <div className={styles.cardAchievementsTitle}>
                <p className={styles.cardSubTitle}>Achievements</p>
                {isPhone && !isTablet && (
                  <ArrowButton
                    direction={isOpenAchievements ? "bottom" : "top"}
                    onClick={() => setIsOpenAchievements((prev) => !prev)}
                  />
                )}
              </div>
              {isPhone && !isTablet ? (
                <motion.div
                  className={styles.cardList}
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    isOpenAchievements
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {achievements.map((item, i) => (
                    <div key={i} className={styles.cardListItem}>
                      <div className={styles.cardListMarker} />
                      {item}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className={styles.cardList}>
                  {achievements.map((item, i) => (
                    <div key={i} className={styles.cardListItem}>
                      <div className={styles.cardListMarker} />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  },
);

CaseStudiesCard.displayName = "CaseStudiesCard";

export default CaseStudiesCard;
