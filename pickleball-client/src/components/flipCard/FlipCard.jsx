import styles from "./FlipCard.module.css";

const FlipCard = ({ frontCard, backCard, widthCard, heightCard }) => {
    return (
        <div className={styles["flip-card"]}>
            <div className={styles["flip-card-inner"]} style={{ width: widthCard, height: heightCard }}>
                <div className={styles["flip-card-front"]}>
                    {frontCard}
                </div>
                <div className={styles["flip-card-back"]}>
                    {backCard}
                </div>
            </div>
        </div>
    );
};

export default FlipCard;