import GuideCard from "../guideCard/GuideCard";
import styles from "./GuideList.module.css";

const GuideList = ({ guideList }) => {
    return (
        <div className={styles["guide-list-container"]}>
            <div className={styles["guide-list-wrapper"]}>
                {guideList?.map((guide, index) => <GuideCard key={index} post={guide} guideType={index === 0 ? "featured" : "normal"} />)}
            </div>
        </div >
    );
};
export default GuideList;