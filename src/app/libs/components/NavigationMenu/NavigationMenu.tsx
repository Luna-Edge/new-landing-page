import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOpened(true);
      } else {
        setIsOpened(false); // Змінюємо на false під час прокрутки
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            />
          );
        })}
        <Button onClick={() => scrollToSection("footer")}>
          Get in touch
          <Image src={ArrowRight} alt="arrow-right" />
        </Button>
      </div>
    </>
  );
};

export default NavigationMenu;
