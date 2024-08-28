import styles from "./WhatOurClientsSaySection.module.scss";

import TestimonialCard from "@/components/ui/TestimonialCard/TestimonialCard";
import { TESTIMONIALS } from "../../utils/constants";

export default function WhatOurClientsSaySection() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>What our clients say</h1>
      <div className={styles.testimonials}>
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.testimonial} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
