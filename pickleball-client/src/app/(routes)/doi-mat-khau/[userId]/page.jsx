"use client";

import ShowPassword from "@/components/showPassword/ShowPassword";
import styles from "./page.module.css";
import { useState } from "react";

const passwordList = [
    {
        key: "old-password",
        label: "Mật khẩu cũ:",
        id: "oldPassword"
    },
    {
        key: "new-password",
        label: "Mật khẩu mới:",
        id: "newPassword"
    },
    {
        key: "repeat-password",
        label: "Nhập lại mật khẩu:",
        id: "repeatPassword"
    }
];

const DoiMatKhau = ({ params: { userId } }) => {
    const [error, setError] = useState(null);

    const [passwords, setPasswords] = useState({
        oldPassword: {
            value: "",
            showPassword: false
        },
        newPassword: {
            value: "",
            showPassword: false
        },
        repeatPassword: {
            value: "",
            showPassword: false
        }
    });

    const checkFullfill = !passwords.oldPassword.value || !passwords.newPassword.value || !passwords.repeatPassword.value;

    const handleChangeInput = (e) => {
        setPasswords({ ...passwords, [e.target.name]: { ...passwords[e.target.name], value: e.target.value } });
    };

    const handleShowPassword = (e, passwordType) => {
        if (passwordType) {
            setPasswords({ ...passwords, [passwordType]: { ...passwords[passwordType], showPassword: !passwords[passwordType]?.showPassword } });
        }
    };

    const handlechangePasswordFetchingFunc = () => {
        setError("");
        if (checkFullfill) {
            return;
        }
        if (passwords.newPassword.value !== passwords.repeatPassword.value) {
            setError("Mật khẩu mới không khớp");
        }
    };

    return (
        <div className={`${styles["doi-mat-khau-container"]} page-width`}>
            {passwordList.map(password => {
                console.log("passwords[password.id].value", passwords[password.id]?.value);
                return (
                    <div className={styles["doi-mat-khau-field"]} key={password.key}>
                        <label htmlFor={password.id}>{password.label}</label>
                        <div className={styles["doi-mat-khau-input-wrapper"]}>
                            <input
                                type={passwords[password.id]?.showPassword ? "text" : "password"}
                                name={password.id}
                                id={password.id}
                                className="input"
                                value={passwords[password.id]?.value}
                                onChange={handleChangeInput} />
                            <div className={styles["show-password"]} onClick={(e) => handleShowPassword(e, password.id)}>
                                <ShowPassword showPassword={passwords[password.id]?.showPassword} handleShowPassword={handleShowPassword} />
                            </div>
                        </div>
                    </div>
                );
            })}
            <p className={styles["doi-mat-khau-error"]}>{error}</p>
            <button className={`${styles["doi-mat-khau-button"]} ${checkFullfill ? "disable" : ""} button`} onClick={handlechangePasswordFetchingFunc}>Đổi mật khẩu</button>
        </div>
    );
};
export default DoiMatKhau;