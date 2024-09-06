import { memo } from "react";
import "swiper/css/effect-coverflow";

import styles from "./Carrousel.module.scss";
import "./styles.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { ComponentProps, useMemo } from "react";
import Card from "./libs/components/Card/Card";
import { useResponsive } from "@/hooks/useResponsive";

interface ICard extends ComponentProps<typeof Card> {
  key: string;
}

interface CarrouselProps {
  cards: ICard[];
}

const Carrousel = ({ cards }: CarrouselProps) => {
  const [, isTablet, isDesktop] = useResponsive();

  const spaceBetween = useMemo(() => {
    switch (true) {
      case isDesktop:
        return 16;
      case isTablet:
        return 16;
      default:
        return 8;
    }
  }, [isTablet, isDesktop]);

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
      spaceBetween={spaceBetween}
      coverflowEffect={{
        rotate: -30,
        stretch: 0,
        depth: 280,
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
};

export default memo(Carrousel);