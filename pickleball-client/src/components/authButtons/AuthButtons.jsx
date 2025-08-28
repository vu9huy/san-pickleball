import Link from "next/link";
import styles from "./AuthButtons.module.css";

const AuthButtons = () => {

    return (
        <>
            <Link href="/dang-nhap" /* prefetch = {false} */>
                <button className={`${styles["auth-link-login"]} button`}>Đăng nhập</button>
            </Link>
            <Link href="/dang-ky" /* prefetch = {false} */>
                <button className={`${styles["auth-link-register"]} button`}>Đăng ký</button>
            </Link>
        </>
    )
}

export default AuthButtons;
