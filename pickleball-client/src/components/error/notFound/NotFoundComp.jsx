import Link from "next/link";
import styles from "./NotFoundComp.module.css";
import { barlow_condensed } from "@/fonts/googleFont";

const notFounds = {
    "default": {
        text: "Không tìm thấy trang",
        buttonText: "Trang chủ",
        buttonUrl: "/"
    },
    "court": {
        text: "Sân không tồn tại",
        buttonText: "Tìm sân",
        buttonUrl: "/tim-san"
    },
    "user": {
        text: "Người dùng không tồn tại",
        buttonText: "Trang chủ",
        buttonUrl: "/"
    }
};

const NotFoundComp = ({ type }) => {

    const notFoundData = type ? notFounds[type] : notFounds["default"];

    return (
        <div className={styles["not-found-container"]}>
            <p className={`${barlow_condensed.variable} ${styles["not-found-banner"]}`}>404</p>
            <p className={styles["not-found-text"]}>{notFoundData.text}</p>
            <Link href={`${notFoundData.buttonUrl}`}>
                <button className={`${styles["not-found-button"]} button`}>{notFoundData.buttonText}</button>
            </Link>
        </div>
    );
};
export default NotFoundComp;