import Link from "next/link";
import styles from "./page.module.css";

const EmailVerified = () => {

    return (
        <div className={`${styles["email-verified"]} page-width`}>
            <h1>Email của bạn đã được xác thực thành công!</h1>
            <Link className="button" href="/">
                Về Trang Chủ
            </Link>
        </div>
    );
};

export default EmailVerified;