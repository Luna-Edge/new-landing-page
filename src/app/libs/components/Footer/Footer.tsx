import { memo, useEffect, useRef } from "react";
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
import classNames from "@/utils/classNames/classNames";

const Footer = () => {
  const boxShadowVal = useRef(50);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });
  const ref = useRef<HTMLElement>(null);

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
        <InteractiveGridBackground className={styles.footer_Grid} />
        <form
          onSubmit={handleSubmit(console.dir)}
          className={styles.footer_Form}
        >
          <h2 className={styles.footer_FormHeader}>Get in touch</h2>
          <p className={styles.footer_FormParagraph}>
            Describe your project and leeave your contact info, we&apos;ll get back
            to you within 24 hours.
          </p>
          <Input
            className={classNames(styles.footer_FormInput, {
              [styles.footer_FormInput_error]: !!errors.name?.message
            })}
            {...register("name")}
            placeholder="Full name"
          />
          <p className={classNames(styles.footer_FormErrorMessage, {
            [styles.footer_FormErrorMessage_error]: !!errors.name?.message
          })}>{errors.name?.message || 'No Errors'}</p>
          <Input
            className={classNames(styles.footer_FormInput, {
              [styles.footer_FormInput_error]: !!errors.email?.message
            })}
            {...register("email")}
            placeholder="Email Address"
          />
          <p className={classNames(styles.footer_FormErrorMessage, {
            [styles.footer_FormErrorMessage_error]: !!errors.email?.message
          })}>{errors.email?.message || 'No Errors'}</p>
          <Textarea
            className={classNames(styles.footer_FormTextarea, {
              [styles.footer_FormInput_error]: !!errors.request?.message
            })}
            rows={5}
            {...register("request")}
            placeholder="Enter your request here"
          />
          <p className={classNames(styles.footer_FormErrorMessage, {
            [styles.footer_FormErrorMessage_error]: !!errors.request?.message
          })}>{errors.request?.message || 'No Errors'}</p>
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
};

export default memo(Footer);
