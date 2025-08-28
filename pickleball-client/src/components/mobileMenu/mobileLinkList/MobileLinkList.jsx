"use client";

import React, { useState } from "react";
import styles from "./MobileLinkList.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { barlow_condensed } from "@/fonts/googleFont";
import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import UserSettings from "@/components/userSettings/UserSettings";
import checkActiveNavLinkFunc from "@/helpers/checkActiveNavLinkFunc";


const MobileLinkList = ({ linkList, handleCloseMenu }) => {
    const pathname = usePathname();
    const [pathLink, setPathLink] = useState(null);

    const handleClickChildrenLink = (pathLinkSelected) => {
        if (pathLinkSelected === pathLink) {
            setPathLink(null);
        } else {
            setPathLink(pathLinkSelected);
        }
    };

    const handleClickLink = (pathLink) => {
        setPathLink(pathLink);
        handleCloseMenu();
    };

    return (
        <div className={`${barlow_condensed.variable} ${styles["mobile-link-list-container"]}`}>
            <div className={styles["mobile-link-list-close-wrapper"]} onClick={() => handleCloseMenu()}>
                <button className={styles["mobile-link-list-close-button"]}>
                    <IconSprites1 id={"sprites-icon-close"} className={styles["mobile-link-list-close-button-icon"]} />
                </button>
            </div>
            <ul className={styles["mobile-link-list-wrapper"]}>
                {linkList?.map(link => {
                    const isActive = checkActiveNavLinkFunc({ linkPath: link.path, pathname });
                    if (link?.children) {
                        return (<li key={link.path} onClick={() => handleClickChildrenLink(link.path)} className={`${styles["mobile-link-item"]} ${isActive ? styles["link-active"] : ""}`}>
                            <a className={styles["mobile-link-item-label"]}>
                                <span>{link.label}&nbsp;
                                </span>
                                <div className={`${styles["mobile-link-item-label-icon"]} ${pathLink == link.path || isActive ? styles["rotate-icon-1"] : styles["rotate-icon-2"]}`}>
                                    <IconSprites1 id="sprites-icon-chevron-up" className={styles["chevron-up-icon"]} />
                                </div>
                            </a>
                            <ul className={`${styles["mobile-link-children-list"]} ${pathLink == link.path || isActive ? styles["open"] : ""}`}>
                                {link?.children?.map(childLink => {
                                    const isActive = checkActiveNavLinkFunc({ linkPath: childLink.path, pathname });
                                    return (
                                        <li
                                            className={`${styles["mobile-link-children-item"]} ${isActive ? styles["link-active"] : ""}`}
                                            onClick={() => handleCloseMenu()}
                                            key={childLink.path}>
                                            <Link href={childLink.path} /* prefetch = {false} */>
                                                <span>{childLink.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>);
                    }
                    return (<li
                        key={link.path} onClick={() => handleClickLink(link.path)} className={`${styles["mobile-link-item"]} ${isActive ? styles["link-active"] : ""}`} >
                        <Link href={link.path} /* prefetch = {false} */>
                            <span>{link.label}</span>
                        </Link>
                    </li>);
                })}
                <UserSettings type={"mobile"} handleCloseMenu={handleCloseMenu} pathname={pathname} />
            </ul>
        </div>
    );
};
export default MobileLinkList;