import React, { useState } from "react";
import styles from "./EmailVerification.module.css";
import { useVerifyEmailFetchingApi } from "@/api/serverApi/callApi";

const EmailVerification = () => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState("");

    const { mutateAsync: verifyEmailMutationAsync } = useVerifyEmailFetchingApi();

    const verifyEmail = async () => {
        const response = await verifyEmailMutationAsync();
        console.log("349843904309", response);

    };

    return (
        <div className={styles["email-verification"]}>
            <p>Email của bạn chưa được xác thực. Vui lòng xác thực để sử dụng đầy đủ các tính năng.</p>
            <button
                onClick={verifyEmail}
                disabled={isVerifying}
                className={styles["verify-button"]}
            >
                {isVerifying ? "Đang gửi..." : "Gửi email xác thực"}
            </button>
            {message && <p className={styles["message"]}>{message}</p>}
        </div>
    );
};

export default EmailVerification;
