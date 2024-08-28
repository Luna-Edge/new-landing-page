"use client";

// import 'swiper/swiper-bundle.min.css';
import 'swiper/css/effect-coverflow';

import { CARROUSEL_INFORMATION } from "./constants";
import styles from "./Carrousel.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow} from "swiper/modules";

interface CarrouselProps {
  cards: typeof CARROUSEL_INFORMATION;
  // offset: number;
  // showArrows: boolean;
  carrouselTitle?:string
}

export default function Carrousel({
  cards,
    carrouselTitle
}: CarrouselProps) {

  return (<div>
        {carrouselTitle && <h3 className={styles.title}>{carrouselTitle}</h3>}

        <div className={styles.container}>
          <Swiper
              slidesPerView={"auto"}
              effect={'coverflow'}
              centeredSlides
              loop
              // autoplay={{ delay: 1, disableOnInteraction: true }}
              modules={[EffectCoverflow]}
              speed={11000}
              freeMode
              spaceBetween={30}
              coverflowEffect={{
                  rotate: -30,
                stretch: 0,
                depth: 380,
                modifier: 1,
              }}
          >
            {cards.map(({ key , content }) => {
              return (
                  <SwiperSlide key={key}>
                    {content}
                  </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
  );
}
