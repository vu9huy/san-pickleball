import React from "react";
import Link from "next/link";
import styles from "./AuthRequired.module.css";
import AuthButtons from "../authButtons/AuthButtons";

const AuthRequired = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          Yêu cầu đăng nhập
        </h2>
        <p className={styles.text}>
          Bạn cần đăng nhập để sử dụng tính năng này
        </p>
        <div className={styles.buttonContainer}>
          {/* <Link href="/dang-nhap">
            <button className={`${styles.loginButton} button`}>
              Đăng nhập
            </button>
          </Link>
          <Link href="/dang-ky">
            <button className={`${styles.registerButton} button`}>
              Đăng ký
            </button>
          </Link> */}
          <AuthButtons/>
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;