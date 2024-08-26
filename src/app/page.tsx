"use client";

import styles from "./page.module.scss";
import 'swiper/css/effect-coverflow';
import {useEffect, useRef, useState} from "react";
import Lenis from "lenis";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Image from "next/image";

import firstSectionBG from "./libs/images/firstSectionBG.png";
import Logo from "@/../public/logo.svg";
import ArrowRight from "@/../public/icons/arrow-right.svg";

import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground/InteractiveGridBackground";
import { INTERACTIVE_GRID_BACKGROUND_GRID_SIZE } from "./libs/utils/constants";
import Button from "@/components/ui/Button/Button";
import Sphere from "@/components/ui/Sphere/Sphere";
import {Group, Object3DEventMap} from "three";
import AboutSection from "@/components/ui/AboutSection/AboutSection";
import {CARROUSEL_INFORMATION} from "@/components/ui/Carrousel/constants";
import dynamic from "next/dynamic";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow} from "swiper/modules";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import {MARQUEE_SLIDES_INFORMATION} from "@/components/ui/MarqueeSlider/constants";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import {TESTIMONIALS} from "@/app/uikit/libs/utils/constants";
import TestimonialCard from "@/components/ui/TestimonialCard/TestimonialCard";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import SoftwareDevelopment from "@/app/uikit/libs/images/icons/SoftwareDevelopment.png";

const Carrousel = dynamic(() => import("@/components/ui/Carrousel/Carrousel"), {
  ssr: false,
});

export default function Home() {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const firstSectionObserverRef = useRef<HTMLDivElement | null>(null);

  const [canvasPosition, setCanvasPosition] = useState( '-60%' );
  const [cameraPosition, setCameraPosition] = useState( 30);


  function CameraController({ position }: { position: number[] }) {
    const { camera } = useThree();

    useFrame(() => {
      camera.position.set(0, position[1], position[2]);
      camera.updateProjectionMatrix();
    });

    return null;
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const updateHeaderContent = () => {
      if (headerContentRef.current) {
        const scaleValue = 1 + scrollY.current / 50;
        const opacityValue = 1 - scrollY.current / 100;

        headerContentRef.current.style.transform = `scale3D(${scaleValue}, ${scaleValue}, 1)`;
        headerContentRef.current.style.opacity = opacityValue.toString();
        headerContentRef.current.style.display = opacityValue > 0 ? "" : "none";
      }
    };

    const updateCanvasAndCamera = () => {
      const bottomValue = Math.max(-60, Math.min(0, -60 + (scrollY.current / 5))).toString() + '%';
      const cameraZ = Math.max(20, Math.min(30, 30 - (scrollY.current / 100)));

      setCanvasPosition(bottomValue );
      setCameraPosition( cameraZ);
    };

    lenis.on("scroll", ({ scroll }) => {
      scrollY.current = scroll;
      updateHeaderContent();
      updateCanvasAndCamera();
    });

    window.scrollTo(0, 0);
    updateHeaderContent();
    updateCanvasAndCamera();
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const sphereRef = useRef<Group<Object3DEventMap>>(null);

  const onSphereFrame = () => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.0007;
      sphereRef.current.rotation.y += 0.0007;
    }
  };

  return (
      <main className={styles.main}>
        <header className={styles.header}>
          <div ref={headerContentRef} className={styles.header_Content}>
            <Image
                className={styles.header_ImageBG}
                src={firstSectionBG}
                alt="firstSectionBG"
            />

            <Canvas
                className={styles.header_Grid}
                camera={{position: [0, 0, 5]}}
            >
              <InteractiveGridBackground
                  gridSize={10}
                  boxSize={7}
                  lineWidth={0.05}
                  transitionSpeed={0.1}
              />
              <mesh
                  position={[0, -INTERACTIVE_GRID_BACKGROUND_GRID_SIZE / 2.1, 0]}
                  rotation={[0, 0, Math.PI]}
              >
                <circleGeometry
                    args={[
                      INTERACTIVE_GRID_BACKGROUND_GRID_SIZE / 4,
                      32,
                      Math.PI,
                      Math.PI,
                    ]}
                />
                <meshBasicMaterial color="#080E2C"/>
              </mesh>
            </Canvas>

            <div className={styles.header_ContentInner}>
              <div className={styles.header_Left}>
                <Image className={styles.header_Logo} src={Logo} alt="logo"/>
                <h1 className={styles.header_Title}>
                  Transforming Ideas into{" "}
                  <span className={styles.header_DigitalSolutions}>
                  Digital Solutions
                </span>
                </h1>
                <p className={styles.header_Description}>
                  We are committed to delivering top-quality, innovative solutions
                  that drive your business forward seamlessly and efficiently
                </p>
              </div>
              <div className={styles.header_Right}>
                <Button className={styles.header_CaseStudies}>
                  <div className={styles.header_CaseStudies_header}>
                    <p>Case studies</p>
                    <Image src={ArrowRight} alt="arrow-right"/>
                  </div>
                  <div className={styles.header_CaseStudies_main}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <div className={styles.header_CaseStudies_footer}>
                    <hr
                        style={{
                          width: "100%",
                          border: "none",
                          height: "1px",
                          backgroundColor: "#030514",
                        }}
                    />
                    <p>50+ implemented projects</p>
                  </div>
                </Button>
                <Button className={styles.header_Button}>
                  About us
                  <Image src={ArrowRight} alt="arrow-right"/>
                </Button>
                <Button className={styles.header_Button}>
                  Our services
                  <Image src={ArrowRight} alt="arrow-right"/>
                </Button>
                <Button>
                  Get in touch
                  <Image src={ArrowRight} alt="arrow-right"/>
                </Button>
              </div>
            </div>
          </div>
        </header>
        <Canvas
            style={{
              position: 'fixed',
              bottom: canvasPosition,
            }}
        >
          <CameraController position={[0, 0, cameraPosition]}/>
          <Sphere onFrame={onSphereFrame} ref={sphereRef}/>
        </Canvas>
        <div ref={firstSectionObserverRef}/>
        <AboutSection/>

            <Carrousel
                cards={CARROUSEL_INFORMATION}
                // offset={1}
                // showArrows={false}
                carrouselTitle={'What is Luna Edge about?'}
            />
              <MarqueeSlider sliderData={MARQUEE_SLIDES_INFORMATION}/>
      </main>
  );
}
