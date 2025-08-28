"use client";

import React from "react";
import styles from "./DesktopLinkList.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { barlow_condensed } from "@/fonts/googleFont";


const checkActiveNavLinkFunc = ({ linkPath, pathname }) => {
    if (!linkPath || !pathname) return false;
    if (linkPath === pathname) return true;
    if (linkPath !== "/" && pathname.includes(linkPath)) return true;
    return false;
};

const DesktopLinkList = ({ linkList }) => {
    const pathname = usePathname();

    return (
        <ul className={`${barlow_condensed.variable} ${styles["desktop-link-list-container"]}`}>
            {linkList?.map(link => {
                const isActive = checkActiveNavLinkFunc({ linkPath: link.path, pathname });
                if (link?.children) {
                    return (<li key={link.path} className={`${styles["desktop-link-item"]} ${isActive ? styles["link-active"] : ""}`}>
                        <span>{link.label}</span>
                        <ul className={styles["desktop-link-children-list"]}>
                            {link?.children?.map(childLink => {
                                const isActive = checkActiveNavLinkFunc({ linkPath: childLink.path, pathname });
                                return (
                                    <li className={`${styles["desktop-link-children-item"]} ${isActive ? styles["link-active"] : ""}`} key={childLink.path}>
                                        <Link href={childLink.path} /* prefetch = {false} */>
                                            <span>{childLink.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>);
                }
                return (<li key={link.path} className={`${styles["desktop-link-item"]} ${isActive ? styles["link-active"] : ""}`} >
                    <Link href={link.path} /* prefetch = {false} */>
                        <span>{link.label}</span>
                    </Link>
                </li>);
            })}
        </ul>
    );
};
export default DesktopLinkList;