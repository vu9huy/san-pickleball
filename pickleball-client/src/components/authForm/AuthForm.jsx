import LoginFrom from "@/components/loginForm/LoginFrom";
import styles from "./AuthForm.module.css";
import SocialLogin from "@/components/socialLogin/SocialLogin";
import RegisterFrom from "../registerForm/RegisterFrom";
import Logo from "../logo/Logo";
import Link from "next/link";

const AuthForm = ({ type }) => {

    return (
        <div className={styles["auth-form-container"]}>
            <div className={styles["auth-form-logo"]}>
                <Logo />
            </div>
            <div className={styles["auth-form-wrapper"]}>
                {type === "login" ?
                    <LoginFrom /> :
                    ""
                }
                {type === "register" ?
                    <RegisterFrom /> :
                    ""
                }
                <div className={styles["auth-form-social-or"]}>
                    <span className={styles["auth-form-social-or-bar"]}></span>
                    <span className={styles["auth-form-social-or-text"]}>hoặc</span>
                    <span className={styles["auth-form-social-or-bar"]}></span>
                </div>
                <div className={styles["auth-form-social-wrapper"]}>
                    <SocialLogin />
                </div>
                <p className={styles["auth-form-swap"]}>
                    {type === "login" ?
                        <span>Chưa có tài khoản,&nbsp;
                            <Link href={"/dang-ky"}>đăng ký</Link>
                            &nbsp;ngay</span> :
                        <span>Đã có tài khoản,&nbsp;
                            <Link href={"/dang-nhap"}>đăng nhập</Link>
                            &nbsp;ngay</span>
                    }
                </p>
            </div>
        </div>
    );
};

export default AuthForm;