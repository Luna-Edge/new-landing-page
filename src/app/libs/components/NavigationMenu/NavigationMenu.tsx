import React, { useEffect, useMemo, useState } from "react";

import styles from "./NavigationMenu.module.scss";
import NavButton from "@/app/libs/components/NavigationMenu/NavButton";
import { NAVIGATION_TABS } from "@/app/libs/components/NavigationMenu/constants";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import { useScroll } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import MenuIcon from "@/app/libs/images/icons/MenuIcon";
import CrossIcon from "@/app/libs/images/icons/CrossIcon";

type NavigationMenuProps = {
  scrollToSection: (to: string) => void;
};

const NavigationMenu = ({ scrollToSection }: NavigationMenuProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { scrollY } = useScroll();

  const [, , isDesktop] = useResponsive();

  useEffect(() => {
    let scrollTimeout: any;

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
      setShowMenu(false);
      setIsOpened(false);
    } else if (scrollY.get() === 0) {
      if (isDesktop) {
        setShowMenu(true);
      }
      setIsOpened(true);
    }
  }, [isDesktop, isScrolling, scrollY]);

  function stopScroll() {
    (window as any).lenis.stop();
    (window as any).lenis.start();
  }

  return (
    <div className={styles.wrapper}>
      {!isDesktop && (
        <button
          onClick={() => setShowMenu((prevState) => !prevState)}
          className={styles.menuButton}
        >
          {showMenu ? <CrossIcon /> : <MenuIcon />}
        </button>
      )}

      <div
        className={`${styles.linksContainer} ${!isOpened ? styles.close : ""} ${!showMenu && !isDesktop ? styles.hidden : ""}`}
      >
        {NAVIGATION_TABS.map((tab, index) => {
          return (
            <NavButton
              key={tab.title}
              index={index}
              title={tab.title}
              image={tab.image}
              footerText={tab.footerText}
              scrollToSection={scrollToSection}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              stopScroll={stopScroll}
              setShowMenu={setShowMenu}
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
    </div>
  );
};

export default NavigationMenu;
