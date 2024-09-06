import React, { memo, useMemo, useRef } from "react";
import styles from "./WhatOurClientsSaySection.module.scss";

import TestimonialCard from "@/components/ui/TestimonialCard/TestimonialCard";
import { TESTIMONIALS } from "../../utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useResponsive } from "@/hooks/useResponsive";
import ArrowButton from "@/components/ui/ArrowButton/ArrowButton";

const WhatOurClientsSaySection = () => {
  const [, isTablet, isDesktop] = useResponsive();
  const prevElBtnRef = useRef<HTMLButtonElement>(null);
  const nextElBtnRef = useRef<HTMLButtonElement>(null);

  const spaceBetween = useMemo(() => {
    switch (true) {
      case isDesktop:
        return 17;
      case isTablet:
        return 8;
      default:
        return 8;
    }
  }, [isTablet, isDesktop]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>What our clients say</h1>
        {!isDesktop && (
          <div className={styles.sliderControls}>
            <ArrowButton direction="left" ref={nextElBtnRef} />
            <ArrowButton direction="right" ref={prevElBtnRef} />
          </div>
        )}
      </div>
      {!isDesktop ? (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevElBtnRef.current,
            nextEl: nextElBtnRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
              swiper.params.navigation.prevEl = nextElBtnRef.current;
              swiper.params.navigation.nextEl = prevElBtnRef.current;
            }
          }}
          className={styles.slider}
          slidesPerView="auto"
          spaceBetween={spaceBetween}
          loop
          freeMode
        >
          {TESTIMONIALS.map(({ id, ...testimonialProps }) => (
            <SwiperSlide key={id}>
              <TestimonialCard {...testimonialProps} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.slider} style={{ gap: spaceBetween }}>
          {TESTIMONIALS.slice(0, 3).map(({ id, ...testimonialProps }) => (
            <TestimonialCard key={id} {...testimonialProps} />
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(WhatOurClientsSaySection);