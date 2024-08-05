"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Card from "../Card/Card";

import { SLIDES_INFORMATION } from "./constants";
import "./styles.scss";

type SliderProps = {
  slidesInformation: typeof SLIDES_INFORMATION;
};

const Slider = ({ slidesInformation }: SliderProps) => {
  return (
    <>
      <Swiper
        loop
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: -25,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slidesInformation.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <Card title={slide.title} text={slide.text} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
