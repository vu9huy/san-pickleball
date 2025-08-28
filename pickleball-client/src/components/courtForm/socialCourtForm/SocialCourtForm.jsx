import FormErrorMessage from "@/components/formErrorMessage/FormErrorMessage";
import styles from "./SocialCourtForm.module.css";
import Link from "next/link";

const SocialCourtForm = ({ register, errors }) => {

    // THÊM REGEX CHECK LINK FACEBOOK, ZALO VÀ SỐ ĐIỆN THOẠI
    const validation = {
        required: "Vui lòng nhập trường này",
        pattern: {}
    };

    return (
        <div className={styles["social-court-form-container"]}>
            <div className={styles["social-court-form-input-wrapper"]}>
                <label className={`${styles["social-court-form-field"]} label`}>
                    <span>Facebook:</span>
                    <input
                        {...register("social.facebook" /* validation */)}
                        placeholder="Link facebook của sân"
                        className="input"
                        type="string"
                    />
                    <FormErrorMessage errors={errors} name="social.facebook" />
                </label>
                <label className={`${styles["social-court-form-field"]} label`}>
                    <span>Zalo:</span>
                    <input
                        {...register("social.zalo" /* validation */)}
                        placeholder="Link zalo đặt sân hoặc nhóm zalo"
                        className="input"
                        type="string"
                    />
                    <FormErrorMessage errors={errors} name="social.zalo" />
                </label>
                <label className={`${styles["social-court-form-field"]} label`}>
                    <span>Số điện thoại:</span>
                    <input
                        {...register("social.phone" /* validation */)}
                        placeholder="0987654321"
                        className="input"
                        type="string"
                    />
                    <FormErrorMessage errors={errors} name="social.phone" />
                </label>
            </div>
        </div>
    );
};

export default SocialCourtForm;