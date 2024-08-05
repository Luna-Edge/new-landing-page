import styles from "./Card.module.scss";

type CardProps = {
  title: string;
  text: string;
};

const Card = ({ title, text }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.symbol} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Card;
