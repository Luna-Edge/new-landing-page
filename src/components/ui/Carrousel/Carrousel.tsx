"use client";

import "swiper/css/effect-coverflow";

import styles from "./Carrousel.module.scss";
import './styles.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { ComponentProps } from "react";
import Card from "./libs/components/Card/Card";

interface ICard extends ComponentProps<typeof Card> {
  key: string;
}

interface CarrouselProps {
  cards: ICard[];
}

export default function Carrousel({ cards }: CarrouselProps) {
  return (
    <Swiper
      className={styles.carrousel}
      slidesPerView="auto"
      effect={"coverflow"}
      centeredSlides
      loop
      modules={[EffectCoverflow]}
      speed={500}
      freeMode
      spaceBetween={30}
      coverflowEffect={{
        rotate: -30,
        stretch: 0,
        depth: 380,
        modifier: 1,
      }}
    >
      {cards.map(({ key, ...cardProps }) => (
        <SwiperSlide key={key}>
          <Card {...cardProps} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
