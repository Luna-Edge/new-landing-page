"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Object3DEventMap } from "three";

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
import Sphere from "@/components/ui/Sphere/Sphere";

// constants
import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/constants";
import { CARROUSEL_INFORMATION } from "@/components/ui/Carrousel/constants";
import { TESTIMONIALS } from "./libs/utils/constants";

// images
import SoftwareDevelopment from "@/app/libs/images/icons/SoftwareDevelopment.png";

const UiKit = () => {
  const sphereRef = useRef<Group<Object3DEventMap>>(null);

  const onSphereFrame = () => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.0007;
      sphereRef.current.rotation.y += 0.0007;
    }
  };

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
        <Button>Test</Button>
        <MarqueeSlider sliderData={MARQUEE_SLIDES_INFORMATION} />
        {/* <Slider slidesInformation={SLIDES_INFORMATION} /> */}
        <Input placeholder="Placeholder" />
        <Textarea placeholder="Placeholder" rows={5} />
        <Carrousel cards={CARROUSEL_INFORMATION} />
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

        <Canvas
          style={{
            height: "100vh",
            widows: "100vw",
          }}
          camera={{ position: [0, 0, 20] }}
        >
          <Sphere onFrame={onSphereFrame} ref={sphereRef} />
        </Canvas>
      </div>
    </main>
  );
};

export default UiKit;
