"use client";

import { useState } from "react";
import styles from "./MobileMenu.module.css";
import MobileLinkList from "./mobileLinkList/MobileLinkList";
import { IconSprites1 } from "../iconSprites/IconSprites";

const MobileMenu = ({ menu }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    return (
        <div className={styles["mobile-menu-container"]}>
            <div className={styles["mobile-menu-open-button"]} onClick={() => handleOpenMenu()}>
                <IconSprites1 id={"sprites-icon-menu"} className={styles["mobile-menu-open-button-icon"]} />
            </div>
            <div className={`${styles["mobile-menu-body"]} ${styles[openMenu ? "open" : ""]}`}>
                <MobileLinkList linkList={menu} openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
            </div>
        </div>
    );
};

export default MobileMenu;
