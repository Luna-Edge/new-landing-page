"use client";

import React, { useRef } from "react";
import CaseStudiesCard from "@/components/ui/CaseStudies/CaseStudiesCard";
import { caseStudies } from "@/components/ui/CaseStudies/data";
import styles from "./CaseStudiesCard.module.scss";

const CaseStudies = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Case studies</h1>
      {caseStudies.map((data, index) => (
        <CaseStudiesCard key={index} index={index} {...data} />
      ))}
    </div>
  );
};

export default CaseStudies;
