"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import styles from "./RegisterFrom.module.css";
import FormErrorMessage from "../formErrorMessage/FormErrorMessage";
import ReactSelect from "react-select";
import { useState } from "react";
import ShowPassword from "../showPassword/ShowPassword";
import Link from "next/link";
import { registerFetchingFunc } from "@/api/serverApi/fetchFunc";
import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
import { useRouter } from "next/navigation";
import { setUserIdToCookie } from "@/utils/userdata/userdataUtilities";
import { ErrorMessage } from "@hookform/error-message";

const inputs = [
    {
        id: "register-form-username",
        inputType: "input",
        label: "Tên người dùng",
        register: "registerUsername",
        type: "text",
        validation: {
            required: "Vui lòng nhập tên",
            // pattern: {
            //     value: /\d+/,
            //     message: "This input is number only."
            // },
            minLength: {
                value: 8,
                message: "Tên phải có tối thiểu 8 ký tự"
            }
        }
    },
    {
        id: "register-form-email",
        inputType: "input",
        label: "Email",
        register: "registerEmail",
        type: "email",
        validation: {
            required: "Vui lòng nhập email",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Vui lòng nhập đúng email"
            }
        }
    },
    {
        id: "register-form-password",
        inputType: "input",
        label: "Mật khẩu",
        register: "registerPassword",
        type: "password",
        otherType: "text",
        validation: {
            required: "Vui lòng nhập mật khẩu",
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Mật khẩu phải có tối thiểu 8 ký tự, bao gồm ít nhất một chữ cái và một số"
            }
        }
    }
];

const options = [
    { value: "user", label: "Người dùng" },
    { value: "owner", label: "Chủ sân" }
];
const default_value = "user";

export const changeInputType = ({ inputId, changeValue, type, otherType }) => {
    let newType = type;
    if (inputId.includes("-password") && otherType) {
        newType = changeValue ? otherType : type;
    }
    return newType;
};

const RegisterFrom = () => {
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        setError,
        formState: { errors },
        handleSubmit,
        control
    } = useForm({
        criteriaMode: "all"
    });

    const onSubmit = async (data) => {
        const registerData = {
            name: data["registerUsername"],
            password: data["registerPassword"],
            email: data["registerEmail"],
            role: data["registerRole"],
            code: data["registerRoleCode"]
        };
        const response = await registerFetchingFunc(registerData);
        console.log("register response", response);
        if (response.status === 200 || response.status === 201) {
            const userData = response.data.user;
            setUserIdToCookie(userData);
            push("/nguoi-dung/" + userData.id);
        }
        if (response.status === 400 && response.data.message === "Email already taken") {
            console.log("ggffggfgfgfgf");
            setError("register", {
                type: "pattern",
                types: {
                    pattern: "Email đã đăng ký"
                },
                message: "Email đã được đăng ký"
            });
        }
    };

    const registerRole = useWatch({
        control,
        name: "registerRole"
    });
    const isOwner = registerRole === "owner";

    return (
        <form className={styles["register-form-container"]} onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(input => {
                return (
                    <div className={`${styles["register-form-field"]} ${styles[input.id]}`} key={input.id}>
                        <label className={styles["register-form-label"]} htmlFor={input.id}>{input.label}:</label>
                        {input.inputType === "input" ?
                            <input
                                id={input.id}
                                type={changeInputType({ inputId: input.id, changeValue: showPassword, type: input.type, otherType: input.otherType })}
                                // value={}
                                className={`${styles["register-form-input"]} input`}
                                {...register(input.register, input.validation)}
                            /> :
                            <textarea
                                id={input.id}
                                // value={}
                                rows={5}
                                className={`${styles["register-form-textarea"]} ${styles[input.id]} input`}
                                {...register(input.register, input.validation)}
                            />}
                        {input.id === "register-form-password" ?
                            <div className={styles["show-password-wrapper"]}>
                                <ShowPassword showPassword={showPassword} handleShowPassword={handleShowPassword} />
                            </div> :
                            ""}

                        <FormErrorMessage errors={errors} name={input.register} />
                    </div>);
            })}
            <Controller
                control={control}
                defaultValue={default_value}
                rules={{ required: "Vui lòng nhập trường này" }}
                name="registerRole"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return <div className={styles["register-form-field"]}>
                        <label className={styles["register-form-label"]} >Vai trò:</label>
                        <ReactSelect
                            instanceId={"register-form-role"}
                            styles={reactSelectCustomStyles}
                            inputRef={ref}
                            classNamePrefix="addl-class"
                            options={options}
                            value={options.find(c => c.value === value)}
                            onChange={val => onChange(val.value)}
                        />
                    </div>;
                }}
            />
            <FormErrorMessage errors={errors} name={"registerRole"} />

            {isOwner ?
                <div className={styles["register-form-field"]}>
                    <label className={styles["register-form-label"]} htmlFor={"register-form-role-code"}>Mã giới thiệu:</label>
                    <input
                        id={"register-form-role-code"}
                        type={"text"}
                        className={`${styles["register-form-input"]} input`}
                        {...register("registerRoleCode", { required: "Vui lòng nhập mã giới thiệu" })}
                    />
                    <p className={styles["register-form-noti"]}>(Nếu bạn là chủ sân và muốn hợp tác, <Link href={"https://www.facebook.com/people/S%C3%A2n-Pickleball/61561925831015/"} target={"_blank"} rel={"nofollow"}>nhắn tin cho page để lấy mã giới thiệu</Link>)</p>
                    <FormErrorMessage errors={errors} name={"registerRoleCode"} />
                </div> : ""}
            <FormErrorMessage errors={errors} name={"register"} />
            <input className={`${styles["register-form-submit"]} button`} type="submit" value="Đăng ký" />
        </form>
    );
};

export default RegisterFrom;