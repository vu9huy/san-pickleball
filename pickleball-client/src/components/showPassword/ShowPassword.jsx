import { IconSprites1 } from "../iconSprites/IconSprites";
import styles from "./ShowPassword.module.css";

const ShowPassword = ({ showPassword, handleShowPassword }) => {

    // const handleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <div className={`${styles["auth-form-show-password"]} icon-wrapper`} onClick={handleShowPassword}>
            {showPassword ?
                <IconSprites1 id="sprites-icon-open-eye" className={styles["auth-form-show-password-icon"]} /> :
                <IconSprites1 id="sprites-icon-close-eye" className={styles["auth-form-show-password-icon"]} />}
        </div>
    );
};
export default ShowPassword;