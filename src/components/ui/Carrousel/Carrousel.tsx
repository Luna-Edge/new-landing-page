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
  // offset,
  // showArrows,
    carrouselTitle
}: CarrouselProps) {
  // const [goToSlide, setGoToSlide] = useState<number>(0);

  // const slides = cards.map((element, index) => {
  //   return { ...element, onClick: () => setGoToSlide(index) };
  // });

  // const offsetFn: ComponentProps<typeof Carousel>["offsetFn"] = (
  //   offsetFromCenter
  // ) => {
  //   return { opacity: offsetFromCenter === 0 ? undefined : 1 };
  // };

  return (<>
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
      </>
  );
}
