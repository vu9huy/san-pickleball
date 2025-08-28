import Link from "next/link";
import styles from "./ComingSoon.module.css";

const ComingSoon = () => {

    return (
        <div className={styles["coming-soon-container"]}>
            <div className={styles["overlay"]}>
                <h1 className={styles["coming-soon-text"]}>Tính năng sắp ra mắt</h1>
                <Link href="/" className="button">Trang chủ</Link>
            </div>
        </div>
    );
};

export default ComingSoon;
