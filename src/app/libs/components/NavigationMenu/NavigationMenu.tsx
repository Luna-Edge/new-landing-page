import React, { useState } from "react";

import styles from "./NavigationMenu.module.scss";
import NavButton from "@/app/libs/components/NavigationMenu/NavButton";
import { NAVIGATION_TABS } from "@/app/libs/components/NavigationMenu/constants";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState("Case studies");
  return (
    <>
      {isOpen ? (
        <div>open</div>
      ) : (
        <div className={styles.container}>
          {NAVIGATION_TABS.map((tab) => {
            return (
              <NavButton
                key={tab.title}
                title={tab.title}
                activeTitle={activeTitle}
                image={tab.image}
                footerText={tab.footerText}
                setActiveTitle={setActiveTitle}
              />
            );
          })}
          <Button>
            Get in touch
            <Image src={ArrowRight} alt="arrow-right" />
          </Button>
        </div>
      )}
    </>
  );
};

export default NavigationMenu;
