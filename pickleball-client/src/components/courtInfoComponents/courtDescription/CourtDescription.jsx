"use client";
import { useState } from "react";
import styles from "./CourtDescription.module.css";

const CourtDescription = ({ description, limit }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const wordLimit = limit ? limit : 12;
    const words = description.split(" ");

    const isTruncated = words.length > wordLimit;
    const displayedText = isExpanded
        ? description
        : words.slice(0, wordLimit).join(" ") + (isTruncated ? "..." : "");

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles["court-description"]}>
            {displayedText}
            {isTruncated && (
                <button className={styles["view-more-button"]} onClick={toggleExpand}>
                    {isExpanded ? "Rút gọn" : "Xem thêm"}
                </button>
            )}
            <p className={styles["court-hidden-description"]}>{description}</p>
        </div>
    );
};

export default CourtDescription;