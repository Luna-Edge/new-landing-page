"use client";

import React, { useState } from "react";
import CaseStudiesCard from "@/components/ui/CaseStudies/CaseStudiesCard";
import { caseStudies } from "@/components/ui/CaseStudies/data";
import styles from "./CaseStudiesCard.module.scss";
import ArrowRight from "@/../public/icons/arrow-right.svg";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { useResponsive } from "@/hooks/useResponsive";

const CaseStudies = () => {
  const [, , isDesktop] = useResponsive();
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Case studies</h1>
        <div className={styles.buttons}>
          <Button onClick={() => swiperInstance?.slidePrev()}>
            <Image src={ArrowRight} alt="arrow-left" />
          </Button>
          <Button onClick={() => swiperInstance?.slideNext()}>
            <Image src={ArrowRight} alt="arrow-right" />
          </Button>
        </div>
      </div>
      {isDesktop ? (
        caseStudies.map((data, index) => (
          <CaseStudiesCard index={index} {...data} key={index} />
        ))
      ) : (
        <Swiper loop modules={[Navigation]} onSwiper={setSwiperInstance}>
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
