"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ScrollingText from "../ScrollingText/ScrollingText";

import "./styles.scss";
import { MARQUEE_SLIDES_INFORMATION } from "./constants";

interface MarqueeSliderProps {
  sliderData: typeof MARQUEE_SLIDES_INFORMATION;
}

export default function MarqueeSlider({ sliderData }: MarqueeSliderProps) {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides
      loop
      autoplay={{ delay: 1, disableOnInteraction: true }}
      modules={[Autoplay]}
      speed={11000}
      freeMode
      spaceBetween={0}
    >
      {sliderData.map(({ id, altText, icon, text }) => {
        return (
          <SwiperSlide key={id}>
            <ScrollingText altText={altText} text={text} icon={icon} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
