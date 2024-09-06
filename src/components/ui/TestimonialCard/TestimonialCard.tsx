import React, { memo } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './TestimonialCard.module.scss'
import classNames from '@/utils/classNames/classNames';

interface TestimonialCardProps {
  testimonial: string;
  author: {
    name: string;
    position: string;
    avatar: StaticImageData;
  };
  className?: string;
}

const TestimonialCard = memo(({
  testimonial,
  author: {
    name,
    position,
    avatar,
  },
  className = '',
}: TestimonialCardProps) => {
  return (
    <article className={classNames(styles.testimonial_card, { className })}>
      <p className={styles.testimonial}>
        {testimonial}
      </p>
      <div className={styles.author}>
        <Image className={styles.author_image} src={avatar} alt={`${name} avatar`} />
        <h3 className={styles.author_name}>{name}</h3>
        <h5 className={styles.author_position}>{position}</h5>
      </div>
    </article>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;