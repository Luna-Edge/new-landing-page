import React, { useEffect, useMemo, useState } from "react";

import styles from "./NavigationMenu.module.scss";
import NavButton from "@/app/libs/components/NavigationMenu/NavButton";
import { NAVIGATION_TABS } from "@/app/libs/components/NavigationMenu/constants";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";

type NavigationMenuProps = {
  scrollToSection: (to: string) => void;
};
const NavigationMenu = ({ scrollToSection }: NavigationMenuProps) => {
  const [activeTitle, setActiveTitle] = useState("Case studies");
  const [isOpened, setIsOpened] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  useMemo(() => {
    if (isScrolling) {
      setIsOpened(false);
    } else if (window.scrollY === 0) {
      setIsOpened(true);
    }
  }, [isScrolling]);

  function stopScroll() {
    (window as any).lenis.stop();
    (window as any).lenis.start();
  }

  return (
    <>
      <div className={`${styles.container} ${!isOpened ? styles.close : ""}`}>
        {NAVIGATION_TABS.map((tab) => {
          return (
            <NavButton
              key={tab.title}
              title={tab.title}
              activeTitle={activeTitle}
              image={tab.image}
              footerText={tab.footerText}
              setActiveTitle={setActiveTitle}
              scrollToSection={scrollToSection}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              stopScroll={stopScroll}
            />
          );
        })}
        <Button
          onClick={() => {
            stopScroll();
            scrollToSection("footer");
          }}
        >
          Get in touch
          <Image src={ArrowRight} alt="arrow-right" />
        </Button>
      </div>
    </>
  );
};

export default NavigationMenu;
