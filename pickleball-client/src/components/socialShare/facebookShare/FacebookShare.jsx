"use client";

import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "../SocialShare.module.css";

const FacebookShare = () => {
    return (
        <div className={styles["facebook-share-button-container"]}>
            <div className={`${styles["fb-share-button"]} "fb-share-button"`} data-href={window?.location?.href} data-layout="" data-size="">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(window?.location?.href)}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">
                    <span className={styles["facebook-icon-wrapper"]}><IconSprites1 id="sprites-icon-facebook" width="12px" height="12px" fill="#ffffff" /></span>
                    <span className={styles["facebook-share-text"]}>Chia sẻ sân</span>
                </a>
            </div>
        </div>
    );
};

export default FacebookShare;