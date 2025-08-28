import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../logo/Logo";
import DesktopMenu from "../destopMenu/DesktopMenu";
import MobileMenu from "../mobileMenu/MobileMenu";

const Navbar = () => {

    const menu = [
        {
            label: "Trang chủ",
            path: "/"
        },
        {
            label: "Tìm sân",
            path: "/tim-san"
        },
        {
            label: "Tỉnh/thành",
            path: "/tinh-thanh"
        },
        {
            label: "Hướng dẫn",
            path: "/huong-dan"
        },
        // {
        //     label: "Blog",
        //     path: "/blogs"
        // },
        {
            label: "Tìm bạn",
            path: "/tim-nguoi-choi"
        },
        {
            label: "Chợ",
            path: "/cho-thanh-ly",
            children: [
                {
                    label: "Dụng cụ",
                    path: "/cho-thanh-ly/dung-cu"
                },
                {
                    label: "Pass sân",
                    path: "/cho-thanh-ly/pass-san"
                }
            ]
        }
        // {
        //     label: "Cộng đồng",
        //     path: "/cong-dong",
        //     children: [
        //         {
        //             label: "Khóa học",
        //             path: "/cong-dong/khoa-hoc"
        //         },
        //         {
        //             label: "Giáo viên",
        //             path: "/cong-dong/giao-vien"
        //         },
        //         {
        //             label: "Câu lạc bộ",
        //             path: "/cong-dong/clb"
        //         }
        //     ]
        // }
    ];

    return (
        <div className={styles["navbar-container"]}>
            <div className={styles["navbar-wapper"]}>
                <div className={styles["navbar-left"]}>
                    <Logo />
                </div>
                <div className={styles["navbar-right"]}>
                    <DesktopMenu menu={menu} />
                    <MobileMenu menu={menu} />
                </div>
            </div>
        </div>
    );
};
export default Navbar;