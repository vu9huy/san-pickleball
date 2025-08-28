import styles from "./BannerLabel.module.css";
import { dongle } from "@/fonts/googleFont";

const BannerLabel = ({ label, align }) => {
    const labelSplit = label.text.split(label.keyword);
    labelSplit.splice(1, 0, label.keyword);
    return (
        <div className={`${styles["banner-label-container"]} ${styles[align]} ${dongle.variable}`}>
            {labelSplit.map((item, index) => {
                return (
                    <h2 key={index} className={item === label.keyword ? styles["banner-pickleball-label"] : styles["banner-label"]}>{item}</h2>);
            })}
        </div>
    );
};
export default BannerLabel;