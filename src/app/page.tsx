"use client";

import styles from "./page.module.scss";
import "swiper/css/effect-coverflow";
import { useCallback, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Sphere from "@/components/ui/Sphere/Sphere";
import Footer from "./libs/components/Footer/Footer";

import Logo from "@/../public/logo.svg";
import ArrowRight from "@/../public/icons/arrow-right.svg";

import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground/InteractiveGridBackground";

import { Group } from "three";
import AboutSection from "@/app/libs/components/AboutSection/AboutSection";
import { CARDS } from "@/components/ui/Carrousel/libs/utils/constants";
import MarqueeSlider from "@/components/ui/MarqueeSlider/MarqueeSlider";
import { MARQUEE_SLIDES_INFORMATION } from "@/components/ui/MarqueeSlider/libs/utils/constants";
import WhatOurClientsSaySection from "./libs/components/WhatOurClientsSaySection/WhatOurClientsSaySection";
import ServicesSection from "@/app/libs/components/ServicesSection/ServicesSection";
import CaseStudies from "@/components/ui/CaseStudies/CaseStudies";

import Carrousel from "@/components/ui/Carrousel/Carrousel";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useScreen } from "usehooks-ts";
import { useResponsive } from "@/hooks/useResponsive";

export default function Home() {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const sphereCanvasRef = useRef<HTMLCanvasElement>(null);
  const [, , , responsiveSizes] = useResponsive();
  const screen = useScreen();
  const { scrollY } = useScroll();
  const scrollDirection = useRef<"up" | "down">("down");
  const carrouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const cameraPositionZRef = useRef(12);
  const cameraPositionYRef = useRef(26);

  const rotationSpeed = useRef(0.0007);
  const defaultSpeed = 0.0007;
  const maxSpeed = 0.007;

  let scrollTimeout: NodeJS.Timeout;

  const scrollToFooter = useCallback(() => {
    if (footerRef.current) {
      const footerRect = footerRef.current.getBoundingClientRect();
      const scrollPosition =
        window.scrollY + footerRect.top + footerRect.height / 5;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  function CameraController() {
    const { camera } = useThree();
    const isFirstRender = useRef(true);

    useFrame(() => {
      if (sphereRef.current) {
        if (isFirstRender.current) {
          camera.position.set(
            0,
            cameraPositionYRef.current,
            cameraPositionZRef.current,
          );
          camera.updateProjectionMatrix();
          isFirstRender.current = false;
        } else {
          camera.position.lerp(
            {
              x: 0,
              y: cameraPositionYRef.current,
              z: cameraPositionZRef.current,
            },
            0.08,
          );
          camera.updateProjectionMatrix();
        }
      }
    });

    return null;
  }

  const sphereSize = useTransform(
    useMotionValue(screen?.width),
    [responsiveSizes.phone, responsiveSizes.tablet, responsiveSizes.desktop],
    [
      { z: 22, y: 3 },
      { z: 22, y: 3 },
      { z: 18, y: 0 },
    ],
  );

  const headerContentInnerRef = useRef<HTMLDivElement>(null);

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
        const scaleValue = 1 + scrollY.get() / 300;
        const opacityValue = 1 - scrollY.get() / 600;

        if (headerContentInnerRef.current) {
          headerContentInnerRef.current.style.opacity = opacityValue.toString();
        }

        headerContentRef.current.style.transform = `scale3D(${scaleValue}, ${scaleValue}, 1)`;
        headerContentRef.current.style.opacity = opacityValue.toString();
        headerContentRef.current.style.display = opacityValue > 0 ? "" : "none";
      }
    };

    const updateCanvasAndCamera = () => {
      const cameraZ = Math.max(
        sphereSize.get().z,
        Math.min(
          12 + sphereSize.get().z,
          12 + sphereSize.get().z - scrollY.get() / 70,
        ),
      );
      const cameraY = Math.max(
        sphereSize.get().y,
        26 + sphereSize.get().y - scrollY.get() / 40,
      );
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

    lenis.on("scroll", () => {
      clearTimeout(scrollTimeout);

      if (scrollY.get() > lastScrollY) {
        scrollDirection.current = "down";
      } else if (scrollY.get() < lastScrollY) {
        scrollDirection.current = "up";
      }

      rotationSpeed.current = maxSpeed;

      updateHeaderContent();
      updateCanvasAndCamera();

      lastScrollY = scrollY.get();

      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onSphereFrame = useCallback(() => {
    if (sphereRef.current) {
      const directionMultiplier = scrollDirection.current === "down" ? 1 : -1;
      sphereRef.current.rotation.x +=
        rotationSpeed.current * directionMultiplier;
      sphereRef.current.rotation.y +=
        rotationSpeed.current * directionMultiplier;
    }
  }, []);

  const motionScreenWidth = useMotionValue(screen?.width);

  useEffect(() => {
    motionScreenWidth.set(screen?.width);
  }, [motionScreenWidth, screen?.width]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div ref={headerContentRef} className={styles.header_Content}>
          <div className={styles.header_Background}>
            <InteractiveGridBackground className={styles.header_Grid} />
            <motion.div
              className={styles.header_BGCircle}
              style={{
                width: useTransform(
                  motionScreenWidth,
                  [
                    ((screen?.height / 5.8) * responsiveSizes.phone) / 100,
                    ((screen?.height / 2) * responsiveSizes.tablet) / 100,
                    ((screen?.height / 5.8) * responsiveSizes.desktop) / 100,
                  ],
                  [
                    ((screen?.height / 5.8) * 280) / 100,
                    ((screen?.height / 5) * 250) / 100,
                    ((screen?.height / 5.8) * 500) / 100,
                  ]
                ),
                boxShadow: useTransform(
                  scrollY,
                  [0, 400],
                  [
                    "inset 0px -10px 100px 30px rgba(20, 128, 255, 0.5), 0px -10px 100px 30px rgba(20, 128, 255, 0.5)",
                    "inset 0px 0px 0px 0px rgba(20, 128, 255, 0), 0px 0px 0px 0px rgba(20, 128, 255, 0)",
                  ],
                ),
              }}
            ></motion.div>
          </div>
        </div>

        <div ref={headerContentInnerRef} className={styles.header_ContentInner}>
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

      <div style={{ overflow: "hidden" }}>
        <MarqueeSlider slides={MARQUEE_SLIDES_INFORMATION} />
      </div>

      <ServicesSection onButtonClick={scrollToFooter} />

      <WhatOurClientsSaySection />

      <CaseStudies />

      <div ref={footerRef} style={{ overflow: "hidden" }}>
        <Footer />
      </div>
    </main>
  );
}
