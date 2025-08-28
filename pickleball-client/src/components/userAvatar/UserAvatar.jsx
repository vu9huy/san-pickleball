import getFirstCharacter from "@/utils/others/getFirstCharacter";
import styles from "./UserAvatar.module.css";

const UserAvatar = ({ name }) => {

    const firstCharacter = getFirstCharacter(name);

    return (
        <div className={styles["user-avatar-container"]}>
            <div className={`${styles["user-avatar-wrapper"]} button`}>
                <span>{firstCharacter}</span>
            </div>
        </div>
    );
};

export default UserAvatar;