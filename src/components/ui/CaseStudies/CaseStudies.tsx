"use client";

import React, { useState } from "react";
import CaseStudiesCard from "@/components/ui/CaseStudies/CaseStudiesCard";
import { caseStudies } from "@/components/ui/CaseStudies/data";
import styles from "./CaseStudiesCard.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { useResponsive } from "@/hooks/useResponsive";
import ArrowButton from "@/components/ui/ArrowButton/ArrowButton";

const CaseStudies = () => {
  const [, , isDesktop] = useResponsive();
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Case studies</h1>
        <div className={styles.buttons}>
          <ArrowButton
            direction={"left"}
            onClick={() => swiperInstance?.slidePrev()}
          />
          <ArrowButton
            direction={"right"}
            onClick={() => swiperInstance?.slideNext()}
          />
        </div>
      </div>
      {isDesktop ? (
        caseStudies.map((data, index) => (
          <CaseStudiesCard index={index} {...data} key={index} />
        ))
      ) : (
        <Swiper
          loop
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          spaceBetween={8}
        >
          {caseStudies.map((data, index) => (
            <SwiperSlide key={index} style={{ marginBlock: 0 }}>
              <CaseStudiesCard index={index} {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CaseStudies;
