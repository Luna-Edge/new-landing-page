import React, { CSSProperties, useMemo } from "react";

import styles from "./ServicesSection.module.scss";

import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/ui/Button/Button";

import ArrowRight from "../../../../app/libs/images/icons/arrow-right.png";
import { getServiceCardsData } from "@/app/libs/components/ServicesSection/constants";
import { useResponsive } from "@/hooks/useResponsive";

interface ServicesSectionProps {
  onButtonClick: (to: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onButtonClick }) => {
  const [isMobile, isTablet, isDesktop] = useResponsive();

  const serviceCardsData = useMemo(
    () =>
      getServiceCardsData({
        isMobile: isMobile && !isTablet && !isDesktop,
        isTablet: isTablet && !isDesktop,
      }),
    [isDesktop, isMobile, isTablet],
  );

  const renderServiceCards = (
    column: (typeof serviceCardsData)[number]["column"],
  ) => {
    return serviceCardsData
      .filter((card) => card.column === column)
      .map((card, index) => (
        <ServiceCard
          key={index}
          title={card.title}
          image={{
            src: card.image.src as StaticImageData,
            styles: card.image.styles as CSSProperties,
          }}
        />
      ));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Our services</h3>
      {isDesktop ? (
        <div className={styles.serviceCardsWrapper}>
          <div className={styles.column1}>{renderServiceCards("column1")}</div>
          <div className={styles.column2}>
            {renderServiceCards("column2")}
            <Button className={styles.button} onClick={onButtonClick}>
              Get in touch
              <Image src={ArrowRight} alt="arrow-right" />
            </Button>
          </div>
          <div className={styles.column3}>{renderServiceCards("column3")}</div>
        </div>
      ) : isTablet ? (
        <div className={styles.tabletContainer}>
          <div className={styles.serviceCardsWrapper}>
            <div className={styles.column1}>
              {renderServiceCards("column1")}
            </div>
            <div className={styles.column2}>
              {renderServiceCards("column2")}
            </div>
          </div>

          <Button className={styles.button} onClick={onButtonClick}>
            Get in touch
            <Image src={ArrowRight} alt="arrow-right" />
          </Button>
        </div>
      ) : (
        isMobile && (
          <div className={styles.tabletContainer}>
            <div className={styles.serviceCardsWrapper}>
              <div className={styles.column1}>
                {renderServiceCards("column1")}
              </div>
            </div>

            <Button className={styles.button} onClick={onButtonClick}>
              Get in touch
              <Image src={ArrowRight} alt="arrow-right" />
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default ServicesSection;
