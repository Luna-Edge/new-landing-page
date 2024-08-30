"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ScrollingText from "./libs/components/ScrollingText/ScrollingText";

import styles from "./MarqueeSlider.module.scss";
import "./styles.scss";
import { ComponentProps } from "react";

interface IScrollingText extends ComponentProps<typeof ScrollingText> {
  id: string;
}

interface MarqueeSliderProps {
  slides: IScrollingText[];
}

export default function MarqueeSlider({ slides }: MarqueeSliderProps) {
  return (
    <Swiper
      className={styles.slider}
      slidesPerView={"auto"}
      centeredSlides
      loop
      autoplay={{ delay: 1, disableOnInteraction: true }}
      modules={[Autoplay]}
      speed={11000}
      freeMode
    >
      {slides.map(({ id, ...slideProps }) => (
        <SwiperSlide key={id}>
          <ScrollingText {...slideProps} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
