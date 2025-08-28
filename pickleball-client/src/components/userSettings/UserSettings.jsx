"use client";

import Link from "next/link";
import styles from "./UserSettings.module.css";
import { getUserIdFromCookie, removeUserIdFromCookie } from "@/utils/userdata/userdataUtilities";
import { useRouter } from "next/navigation";
import checkActiveNavLinkFunc from "@/helpers/checkActiveNavLinkFunc";
import { useEffect, useState } from "react";


const defaultSettings = [
    {
        label: "Đăng nhập",
        path: () => "/dang-nhap",
        icon: ""
    },
    {
        label: "Đăng ký",
        path: () => "/dang-ky",
        icon: ""
    }
];

const authMobile = [
    {
        label: "Tài khoản",
        path: (userId) => `/nguoi-dung/${userId}`,
        icon: ""
    },
    {
        label: "Đổi mật khẩu",
        path: (userId) => `/doi-mat-khau/${userId}`,
        icon: ""
    },
    {
        label: "Đăng xuất",
        path: (userId) => "",
        icon: "",
        func: "logout"
    }
];

const UserSettings = ({ type, handleCloseMenu, pathname }) => {
    const { push } = useRouter();

    const userId = getUserIdFromCookie();

    const funcList = {
        "logout": () => {
            removeUserIdFromCookie();
            push("/dang-nhap");
        }
    };

    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        if (userId) {
            setSettings(authMobile);
        }
    }, []);


    if (type === "mobile") {
        return (
            <div className={styles["user-setting-mobile-container"]}>
                <ul className={styles["user-setting-mobile-list"]}>
                    {settings.map((setting, index) => {
                        const isActive = checkActiveNavLinkFunc({ linkPath: setting.path(userId), pathname });
                        return (
                            <li
                                className={`${styles["mobile-link-item"]} ${isActive ? styles["link-active"] : ""}`}
                                key={index}
                                onClick={async () => {
                                    if (setting?.func) await funcList[setting?.func]();
                                    handleCloseMenu();
                                }}>
                                <Link href={setting.path(userId)} /* prefetch = {false} */>
                                    <span>{setting.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className={styles["user-setting-container"]}>
            <ul className={styles["user-setting-list"]}>
                {settings.map((setting, index) => {
                    return (
                        <li className={styles["user-setting-item"]} key={index} onClick={() => {
                            if (setting?.func) funcList[setting?.func]();
                        }}>
                            <Link href={setting.path(userId)}>
                                <span className={styles["user-setting-item-label"]}>{setting.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserSettings;
