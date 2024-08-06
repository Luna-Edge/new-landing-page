"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ScrollingText from "../ScrollingText/ScrollingText";

import "./styles.scss";
import { MARQUEE_SLIDES_INFORMATION } from "./constants";

type MarqueeSliderProps = {
  sliderData: typeof MARQUEE_SLIDES_INFORMATION;
};

const MarqueeSlider = ({ sliderData }: MarqueeSliderProps) => {
  return (
    <>
      <Swiper
        centeredSlides={true}
        loop
        autoplay={{ delay: 1, disableOnInteraction: true }}
        modules={[Autoplay]}
        slidesPerView={"auto"}
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
    </>
  );
};

export default MarqueeSlider;
