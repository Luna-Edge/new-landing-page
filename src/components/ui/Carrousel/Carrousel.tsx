"use client";

import { ComponentProps, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

import { CARROUSEL_INFORMATION } from "./constants";
import styles from "./Carrousel.module.scss";

interface CarrouselProps {
  cards: typeof CARROUSEL_INFORMATION;
  offset: number;
  showArrows: boolean;
};

export default function Carrousel({
  cards,
  offset,
  showArrows,
}: CarrouselProps) {
  const [goToSlide, setGoToSlide] = useState<number>(0);

  const slides = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const offsetFn: ComponentProps<typeof Carousel>["offsetFn"] = (
    offsetFromCenter
  ) => {
    return { opacity: offsetFromCenter === 0 ? undefined : 1 };
  };

  return (
    <div className={styles.container}>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={offset}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        offsetFn={offsetFn}
      />
    </div>
  );
}
