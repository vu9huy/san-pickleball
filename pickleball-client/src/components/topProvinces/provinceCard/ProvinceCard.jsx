import Link from "next/link";
import styles from "./ProvinceCard.module.css";

const ProvinceCard = ({ provinceData, type }) => {
    const { label, numberOfCourts, image, value, slug } = provinceData;

    return (
        <div className={`${styles["province-card"]} ${styles[type]}`}>
            <div className={styles["province-card-image-wrapper"]}>
                {image ?
                    <img src={image} alt={`${label} province view`} loading="lazy" className={styles["province-card-image"]} />
                    : null}
                <h2 className={styles["province-card-title"]}>{label}</h2>
            </div>
            <div className={styles["province-card-stats"]}>
                {/* <div className={styles["province-card-stat"]}>
                    <span>Số điểm chơi</span>
                    <span className={styles["stat-value"]}>{locations}</span>
                </div> */}
                <div className={styles["province-card-stat"]}>
                    <span>Số sân</span>
                    <span className={styles["stat-value"]}>{numberOfCourts}</span>
                </div>
            </div>
            {/* {slug ? <Link className={styles["province-card-link"]} href={`tinh-thanh/${slug}`} prefetch={false}></Link> : null} */}
            {slug ? <Link className={styles["province-card-link"]} href={`tim-san?province=${slug}`} prefetch={false}></Link> : null}
        </div>
    );
};

export default ProvinceCard;
