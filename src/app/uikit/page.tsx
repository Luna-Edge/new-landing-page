"use client";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Slider from "@/components/ui/Slider/Slider";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import Textarea from "@/components/ui/Textarea/Textarea";

import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/constants";
import { SLIDES_INFORMATION } from "@/components/ui/Slider/constants";

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
        }}
      >
        <Button handleButtonClick={() => {}}>Test</Button>
        <Button isLarge handleButtonClick={() => {}}>
          Test
        </Button>
        <Slider slidesInformation={SLIDES_INFORMATION} />
        <Input placeholder="Placeholder" />
        <Textarea placeholder="Placeholder" />
        <MarqueeSlider sliderData={MARQUEE_SLIDES_INFORMATION} />
      </div>
    </main>
  );
};

export default UiKit;
