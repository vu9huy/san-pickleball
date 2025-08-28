import { globalConfig } from "@/config/globalConfig";
import styles from "./SocialLogin.module.css";
// import FacebookLoginComp from "./facebookLogin/FacebookLogin";
import GoogleLoginComp from "./googleLogin/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

const SocialLogin = () => {

    return (
        <div className={styles["social-login-container"]}>
            <GoogleOAuthProvider clientId={globalConfig.googleAppClientId}>
                <GoogleLoginComp />
            </GoogleOAuthProvider>
            {/* <FacebookLoginComp /> */}
        </div>
    );
};

export default SocialLogin;