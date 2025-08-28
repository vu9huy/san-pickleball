import AuthLink from "../authLink/AuthLink";
import DesktopLinkList from "./desktopLinkList/DesktopLinkList";
import styles from "./DesktopMenu.module.css";

const DesktopMenu = ({ menu }) => {

    return (
        <div className={styles["desktop-menu-container"]}>
            <DesktopLinkList linkList={menu} />
            <AuthLink />
        </div>
    );
};

export default DesktopMenu;
