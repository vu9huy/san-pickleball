"use client";

import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import styles from "./GoogleLogin.module.css";
import { googleloginFetchingFunc } from "@/api/serverApi/fetchFunc";
import { setUserIdToCookie } from "@/utils/userdata/userdataUtilities";
import { useRouter } from "next/navigation";

const GoogleLoginComp = () => {
    const { push } = useRouter();
    const [isError, setIsError] = useState(false);

    const login = useGoogleLogin({
        onSuccess: codeResponse => loginSuccess(codeResponse),
        onError: codeResponse => loginFailed(codeResponse)
    });

    const loginSuccess = async (codeResponse) => {
        console.log(codeResponse);
        const gooleAccessToken = codeResponse.access_token;
        const response = await googleloginFetchingFunc(gooleAccessToken);
        const userData = response.data.user;
        // console.log("response", response);
        setUserIdToCookie(userData);
        push("/");
    };

    const loginFailed = (codeResponse) => {
        // console.log("codeResponse333", codeResponse);
        setIsError(true);
    };

    return (
        <div className={styles["google-login-container"]}>
            <button onClick={() => login()} type="button" className={styles["google-login-button"]} >
                Đăng nhập với Google
            </button>
            {isError ?
                <p className={styles["google-login-message"]}>Có lỗi xảy ra, vui lòng thử lại sau hoặc báo với admin</p> :
                ""}
        </div>

    );
};
export default GoogleLoginComp;