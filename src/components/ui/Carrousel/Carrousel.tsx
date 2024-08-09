"use client";

import { useEffect, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

import { CARROUSEL_INFORMATION } from "./constants";
import styles from "./Carrousel.module.scss";

type CarrouselProps = {
  cards: typeof CARROUSEL_INFORMATION;
  offset: number;
  showArrows: boolean;
};

export default function Carrousel(props: CarrouselProps) {
  const [offsetRadius, setOffsetRadius] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState<number>(0);

  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  const offsetFn = (offsetFromCenter: number) => {
    let opacity;
    if (offsetFromCenter < 0) {
      opacity = 1;
    } else if (offsetFromCenter > 0) {
      opacity = 1;
    }

    return { opacity };
  };

  return (
    <div className={styles.container}>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        offsetFn={offsetFn}
      />
    </div>
  );
}
