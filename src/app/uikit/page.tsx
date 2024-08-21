"use client";

import dynamic from "next/dynamic";

// components
const Carrousel = dynamic(() => import("@/components/ui/Carrousel/Carrousel"), {
  ssr: false,
});
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import Textarea from "@/components/ui/Textarea/Textarea";
import TestimonialCard from "@/components/ui/TestimonialCard/TestimonialCard";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";

// constants
import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/constants";
import { CARROUSEL_INFORMATION } from "@/components/ui/Carrousel/constants";
import { TESTIMONIALS } from "./libs/utils/constants";

// images
import SoftwareDevelopment from "./libs/images/icons/SoftwareDevelopment.png";

const UiKit = () => {
  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundColor: "black",
        }}
      >
        <Button handleButtonClick={() => {}}>Test</Button>
        <Button isLarge handleButtonClick={() => {}}>
          Test
        </Button>
        <MarqueeSlider sliderData={MARQUEE_SLIDES_INFORMATION} />
        {/* <Slider slidesInformation={SLIDES_INFORMATION} /> */}
        <Input placeholder="Placeholder" />
        <Textarea placeholder="Placeholder" />
        <Carrousel
          cards={CARROUSEL_INFORMATION}
          offset={1}
          showArrows={false}
        />
        <div
          style={{
            display: "flex",
            gap: "17px",
          }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.testimonial} {...testimonial} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            aspectRatio: "1 / 1",
          }}
        >
          <ServiceCard
            title="Software Development"
            image={{
              src: SoftwareDevelopment,
              styles: {
                position: "absolute",
                right: "12px",
                bottom: "-5px",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default UiKit;
