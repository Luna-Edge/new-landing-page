import React from "react";
import Button from "@/components/ui/Button/Button";
import styles from "@/app/libs/components/NavigationMenu/NavigationMenu.module.scss";
import Image, { StaticImageData } from "next/image";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import classNames from "@/utils/classNames/classNames";

type NavButtonProps = {
  title: string;
  activeTitle: string;
  image?: StaticImageData | string;
  footerText: string;
  setActiveTitle: (title: string) => void;
  scrollToSection: (to: string) => void;
  isOpened: boolean;
  setIsOpened: (arg: boolean) => void;
  stopScroll: () => void;
};
const NavButton = ({
  title,
  footerText,
  image,
  activeTitle,
  setActiveTitle,
  scrollToSection,
  isOpened,
  setIsOpened,
  stopScroll,
}: NavButtonProps) => {
  const sectionToScroll =
    title === "About us"
      ? "about"
      : title === "Our services"
        ? "services"
        : "case_studies";

  return (
    <Button
      onClick={() => {
        stopScroll();
        if (!isOpened) {
          setIsOpened(true);
          return;
        }
        setActiveTitle(title);
        scrollToSection(sectionToScroll);
      }}
      className={classNames(styles.button, {
        [styles.active]: activeTitle === title,
        [styles.closed]: !isOpened,
      })}
    >
      <div className={styles.caseStudies_header}>
        <p>{isOpened ? title : "Menu"}</p>
        <Image
          className={!isOpened && styles.rotatedIcon}
          src={ArrowRight}
          alt="arrow-right"
        />
      </div>
      {activeTitle === title && (
        <>
          {image ? (
            <Image src={image} alt="" />
          ) : (
            <div className={styles.caseStudies_main}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <div className={styles.caseStudies_footer}>
            <hr
              style={{
                width: "100%",
                border: "none",
                height: "1px",
                backgroundColor: "#030514",
              }}
            />
            <p>{footerText}</p>
          </div>
        </>
      )}
    </Button>
  );
};

export default NavButton;
