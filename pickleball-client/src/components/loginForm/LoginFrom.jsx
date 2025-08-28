"use client";

import { useForm } from "react-hook-form";
import styles from "./LoginFrom.module.css";
import FormErrorMessage from "../formErrorMessage/FormErrorMessage";
import ShowPassword from "../showPassword/ShowPassword";
import { useState } from "react";
import { changeInputType } from "../registerForm/RegisterFrom";
import { useRouter } from "next/navigation";
import { setUserIdToCookie } from "@/utils/userdata/userdataUtilities";
import { useLoginFetchingApi } from "@/api/serverApi/callApi";

const inputs = [
    {
        id: "login-form-email",
        inputType: "input",
        label: "Email",
        register: "loginEmail",
        type: "email",
        validation: {
            required: "Vui lòng nhập email"
        }
    },
    {
        id: "login-form-password",
        inputType: "input",
        label: "Mật khẩu",
        register: "loginPassword",
        type: "password",
        otherType: "text",
        validation: {
            required: "Vui lòng nhập mật khẩu"
        }
    }
];

const LoginFrom = () => {
    const { push } = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [error, setError] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm({
        criteriaMode: "all"
    });

    const { mutateAsync: loginMutationAsync } = useLoginFetchingApi();

    const onSubmit = async (data) => {
        const loginData = {
            email: data["loginEmail"],
            password: data["loginPassword"]
        };

        const response = await loginMutationAsync(loginData);

        // console.log("response", response);

        if (response.status === 401) {
            setError("Sai email hoặc mật khẩu");
        }
        if (response.status !== 200 && response.status !== 401) {
            setError("Lỗi không xác định");
        }
        if (response.status === 200) {
            const userData = response.data.user;
            setUserIdToCookie(userData);
            push("/");
        }
    };



    return (
        <>
            <form className={styles["login-form-container"]} onSubmit={handleSubmit(onSubmit)}>
                {inputs.map(input => {
                    return (
                        <div className={`${styles["login-form-field"]} ${styles[input.id]}`} key={input.id}>
                            <label className={styles["login-form-label"]} htmlFor={input.id}>{input.label}:</label>
                            {input.inputType === "input" ?
                                <input
                                    id={input.id}
                                    type={changeInputType({ inputId: input.id, changeValue: showPassword, type: input.type, otherType: input.otherType })}
                                    className={styles["login-form-input"]}
                                    {...register(input.register, input.validation)}
                                /> :
                                <textarea
                                    id={input.id}
                                    rows={5}
                                    className={`${styles["login-form-textarea"]} ${styles[input.id]}`}
                                    {...register(input.register, input.validation)}
                                />}
                            {input.id === "login-form-password" ?
                                <div className={styles["show-password-wrapper"]}>
                                    <ShowPassword showPassword={showPassword} handleShowPassword={handleShowPassword} />
                                </div> :
                                ""}

                            <FormErrorMessage errors={errors} name={input.register} />
                        </div>);
                })}

                <p className="error-message">{error ? <p>*{error}</p> : ""}</p>
                <input className={`${styles["login-form-submit"]} button`} type="submit" value="Đăng nhập" />
            </form>
            {/* <button className="button" onClick={handleTest}>Get court data</button> */}
        </>

    );
};

export default LoginFrom;