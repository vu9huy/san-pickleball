import styles from "./ServerError.module.css";
import { barlow_condensed } from "@/fonts/googleFont";

const ServerError = ({ type }) => {


    return (
        <div className={styles["server-error-container"]}>
            Server error
        </div>
    );
};
export default ServerError;