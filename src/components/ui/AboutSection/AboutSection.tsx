import styles from "./AboutSection.module.scss";

const AboutSection = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>About us</h2>
            <p className={styles.text}>Once Luna Edge was just an ambitious idea, and now we are proud that for 5 years of hard work in the IT
                sector. We have (number) satisfied customers, (number) implemented projects, reliable team of
                professionals and multitude flawlessly executed tasks. Now we are ready to implement your idea and turn
                it into a visually stunning, functionally reliable and user-friendly website or mobile application. </p>
        </div>
    );
};

export default AboutSection;