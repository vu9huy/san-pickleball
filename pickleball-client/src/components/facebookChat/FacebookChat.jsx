import { globalConfig } from "@/config/globalConfig";
import styles from "./FacebookChat.module.css";
import Link from "next/link";

const FacebookChat = () => {

    return (
        <div className={styles["facebook-chat-container"]}>
            <Link href={`https://${globalConfig.facebookChatUrl}`} target="_blank" rel="nofollow">
                <div className={styles["facebook-chat-image"]}>
                    <img src="/images/facebook-chat.png" width={60} height={60} alt="facebook-chat" />
                </div>
            </Link>
        </div>
    );
};
export default FacebookChat;
