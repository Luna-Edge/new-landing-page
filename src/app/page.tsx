"use client";

import styles from "./page.module.scss";
import "swiper/css/effect-coverflow";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Sphere from "@/components/ui/Sphere/Sphere";
import Footer from "./libs/components/Footer/Footer";

import Logo from "@/../public/logo.svg";
import ArrowRight from "@/../public/icons/arrow-right.svg";

import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground/InteractiveGridBackground";
import { INTERACTIVE_GRID_BACKGROUND_GRID_SIZE } from "./libs/utils/constants";

import { Group } from "three";
import AboutSection from "@/app/libs/components/AboutSection/AboutSection";
import { CARDS } from "@/components/ui/Carrousel/libs/utils/constants";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/libs/utils/constants";
import WhatOurClientsSaySection from "./libs/components/WhatOurClientsSaySection/WhatOurClientsSaySection";
import CaseStudies from "@/components/ui/CaseStudies/CaseStudies";

import Carrousel from "@/components/ui/Carrousel/Carrousel";
import { useResponsive } from "@/hooks/useResponsive";

export default function Home() {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const sphereCanvasRef = useRef<HTMLCanvasElement>(null);
  const scrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");
  const carrouselRef = useRef<HTMLDivElement>(null);

  const cameraPositionZRef = useRef(12);
  const cameraPositionYRef = useRef(26);

  const rotationSpeed = useRef(0.0007);
  const defaultSpeed = 0.0007;
  const maxSpeed = 0.007;

  let scrollTimeout: NodeJS.Timeout;

  function CameraController() {
    const { camera } = useThree();

    useFrame(() => {
      if (sphereRef.current) {
        camera.position.set(
          0,
          cameraPositionYRef.current,
          cameraPositionZRef.current
        );
        camera.updateProjectionMatrix();
      }
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
      const cameraZ = Math.max(18, Math.min(30, 30 - scrollY.current / 20));
      const cameraY = Math.max(0, Math.min(26, 30 - scrollY.current / 2));
      cameraPositionZRef.current = cameraZ;
      cameraPositionYRef.current = cameraY;

      if (carrouselRef.current) {
        const rect = carrouselRef.current.getBoundingClientRect();
        const carrouselMiddle = rect.top - rect.height / 4;

        if (carrouselMiddle <= 0) {
          if (sphereCanvasRef.current) {
            sphereCanvasRef.current.style.position = "fixed";
            sphereCanvasRef.current.style.top = `${carrouselMiddle}px`;
          }
        } else if (carrouselMiddle > 0) {
          if (sphereCanvasRef.current) {
            sphereCanvasRef.current.style.position = "fixed";
            sphereCanvasRef.current.style.top = "0";
          }
        }
      }
    };

    let lastScrollY = 0;

    lenis.on("scroll", ({ scroll }) => {
      clearTimeout(scrollTimeout);

      scrollY.current = scroll;

      if (scrollY.current > lastScrollY) {
        scrollDirection.current = "down";
      } else if (scrollY.current < lastScrollY) {
        scrollDirection.current = "up";
      }

      rotationSpeed.current = maxSpeed;

      updateHeaderContent();
      updateCanvasAndCamera();

      lastScrollY = scrollY.current;

      scrollTimeout = setTimeout(() => {
        rotationSpeed.current = defaultSpeed;
      }, 10);
    });

    window.scrollTo(0, 0);
    updateHeaderContent();
    updateCanvasAndCamera();
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      clearTimeout(scrollTimeout);
    };
  }, []);

  const sphereRef = useRef<Group>(null);

  const onSphereFrame = () => {
    if (sphereRef.current) {
      const directionMultiplier = scrollDirection.current === "down" ? 1 : -1;
      sphereRef.current.rotation.x +=
        rotationSpeed.current * directionMultiplier;
      sphereRef.current.rotation.y +=
        rotationSpeed.current * directionMultiplier;
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div ref={headerContentRef} className={styles.header_Content}>
          <Canvas
            className={styles.header_Grid}
            camera={{ position: [0, 0, 5] }}
          >
            <InteractiveGridBackground
              gridSize={10}
              boxSize={7}
              lineWidth={0.05}
              transitionSpeed={0.1}
            />
            <mesh
              position={[0, -INTERACTIVE_GRID_BACKGROUND_GRID_SIZE / 2.3, 0]}
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
              <meshBasicMaterial color="#080E2C" />
            </mesh>
          </Canvas>

          <div className={styles.header_ContentInner}>
            <div className={styles.header_Left}>
              <Image className={styles.header_Logo} src={Logo} alt="logo" />
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
                  <Image src={ArrowRight} alt="arrow-right" />
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
                <Image src={ArrowRight} alt="arrow-right" />
              </Button>
              <Button className={styles.header_Button}>
                Our services
                <Image src={ArrowRight} alt="arrow-right" />
              </Button>
              <Button>
                Get in touch
                <Image src={ArrowRight} alt="arrow-right" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Canvas
        ref={sphereCanvasRef}
        style={{
          position: "fixed",
        }}
      >
        <CameraController />
        <Sphere onFrame={onSphereFrame} ref={sphereRef} />
      </Canvas>

      <AboutSection />

      <div className={styles.carrouselWrapper} ref={carrouselRef}>
        <h3 className={styles.carrouselWrapper_Title}>
          What is Luna Edge about?
        </h3>
        <Carrousel cards={CARDS} />
      </div>

      <MarqueeSlider slides={MARQUEE_SLIDES_INFORMATION} />

      <WhatOurClientsSaySection />

        <CaseStudies />

      <Footer />
    </main>
  );
}
