"use client";

import React, { useRef } from "react";
import CaseStudiesCard from "@/components/ui/CaseStudies/CaseStudiesCard";
import { useScroll } from "framer-motion";
import { caseStudies } from "@/components/ui/CaseStudies/data";
import styles from "./CaseStudiesCard.module.scss";

const CaseStudies = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Case studies</h1>
      {[...caseStudies, ...caseStudies, ...caseStudies].map((data, index) => (
        <CaseStudiesCard
          key={index}
          index={index}
          progress={scrollYProgress}
          range={[index * 0.25, 1]}
          targetScale={1 - (3 - index) * 0.04}
          {...data}
        />
      ))}
    </div>
  );
};

export default CaseStudies;
