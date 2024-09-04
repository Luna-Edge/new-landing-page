import Input from "@/components/ui/Input/Input";
import styles from "./Footer.module.scss";
import Textarea from "@/components/ui/Textarea/Textarea";
import Button from "@/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  contactFormSchema,
} from "../../features/schemas/contactFormSchema";
import InteractiveGridBackground from "@/components/ui/InteractiveGridBackground/InteractiveGridBackground";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useResponsive } from "@/hooks/useResponsive";

export default function Footer() {
  const boxShadowVal = useRef(50);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });
  const ref = useRef<HTMLElement>(null);

  const [isMobile, isTablet] = useResponsive();

  const handleGoToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  // Add a scroll listener to the footer to change the box shadow value.
  useEffect(() => {
    let theLowestScrollY = Infinity;

    const listenerFunc = () => {
      if (window.scrollY < theLowestScrollY) {
        theLowestScrollY = window.scrollY;
      }

      if (ref.current) {
        const newBoxShadowVal =
          (Math.floor((window.scrollY - theLowestScrollY) / 20) * 20 + 50) / 4;
        boxShadowVal.current = newBoxShadowVal;
        ref.current.style.boxShadow = `0px 0px ${newBoxShadowVal}px #1480ff`;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addEventListener("scroll", listenerFunc);
        } else {
          removeEventListener("scroll", listenerFunc);
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      ref={ref}
      className={styles.footer}
      style={{
        boxShadow: `0px 0px ${boxShadowVal.current}px #1480ff`,
      }}
    >
      <div className={styles.footer_FormWrapper}>
        <Canvas className={styles.footer_Grid} camera={{ position: [0, 0, 6] }}>
          <InteractiveGridBackground
            gridSize={isTablet ? 9 : isMobile ? 7 : 10}
            boxSize={isMobile ? 1 : 2}
            lineWidth={0.05}
            transitionSpeed={0.1}
          />
        </Canvas>
        <form
          onSubmit={handleSubmit(console.dir)}
          className={styles.footer_Form}
        >
          <h2 className={styles.footer_FormHeader}>Get in touch</h2>
          <p className={styles.footer_FormParagraph}>
            Describe your project and leeave your contact info, we’ll get back
            to you within 24 hours.
          </p>
          <Input
            className={styles.footer_FormInput}
            {...register("name")}
            placeholder="Full name"
          />
          <p>{errors.name?.message}</p>
          <Input
            className={styles.footer_FormInput}
            {...register("email")}
            placeholder="Email Address"
          />
          <p>{errors.email?.message}</p>
          <Textarea
            className={styles.footer_FormTextarea}
            rows={5}
            {...register("request")}
            placeholder="Enter your request here"
          />
          <p>{errors.request?.message}</p>
          <Button className={styles.footer_FormSubmit} type="submit">
            Submit
          </Button>
        </form>
      </div>
      <ul className={styles.footer_Links}>
        <li className={styles.footer_LinksItem}>
          <a className={styles.footer_LinksLink} href="/">
            Email
          </a>
        </li>
        <li className={styles.footer_LinksItem}>
          <a className={styles.footer_LinksLink} href="/">
            LinkedIn
          </a>
        </li>
        <li className={styles.footer_LinksItem}>
          <a className={styles.footer_LinksLink} href="/">
            Clutch
          </a>
        </li>
        <li className={styles.footer_LinksItem}>
          <a onClick={handleGoToTop} className={styles.footer_LinksLink}>
            Go to top
          </a>
        </li>
      </ul>
      <h1 className={styles.footer_MainText}>Luna Edge</h1>
      <ul className={styles.footer_Copyright}>
        <li className={styles.footer_CopyrightItem}>
          © 2024. All rights reserved
        </li>
        <li className={styles.footer_CopyrightItem}>
          Made by Mariia Petrovych
        </li>
      </ul>
    </footer>
  );
}
