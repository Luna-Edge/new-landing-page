"use client";

import styles from "./page.module.scss";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

import firstSectionBG from "./libs/images/firstSectionBG.png";
import Logo from "@/../public/logo.svg";
import ArrowRight from "@/../public/icons/arrow-right.svg";

import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground/InteractiveGridBackground";
import { INTERACTIVE_GRID_BACKGROUND_GRID_SIZE } from "./libs/utils/constants";
import Button from "@/components/ui/Button/Button";
import Footer from "./libs/components/Footer/Footer";

export default function Home() {
  const headerContentRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const firstSectionObserverRef = useRef<HTMLDivElement | null>(null);

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

    lenis.on("scroll", ({ scroll }) => {
      scrollY.current = scroll;
      updateHeaderContent();
    });

    window.scrollTo(0, 0);
    updateHeaderContent();
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
            camera={{ position: [0, 0, 5] }}
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
      <div ref={firstSectionObserverRef} />

      <Footer />
    </main>
  );
}
