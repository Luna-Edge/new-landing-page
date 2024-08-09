"use client";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import Slider from "@/components/ui/Slider/Slider";
import Textarea from "@/components/ui/Textarea/Textarea";

import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/constants";
import { SLIDES_INFORMATION } from "@/components/ui/Slider/constants";
import Carrousel from "@/components/ui/Carrousel/Carrousel";
import { CARROUSEL_INFORMATION } from "@/components/ui/Carrousel/constants";

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
        <MarqueeSlider sliderData={MARQUEE_SLIDES_INFORMATION} />
        {/* <Slider slidesInformation={SLIDES_INFORMATION} /> */}
        <Input placeholder="Placeholder" />
        <Textarea placeholder="Placeholder" />
        <Carrousel
          cards={CARROUSEL_INFORMATION}
          // height="500px"
          // width="1350px"
          // margin="0 auto"
          offset={1}
          showArrows={false}
        />
      </div>
    </main>
  );
};

export default UiKit;
