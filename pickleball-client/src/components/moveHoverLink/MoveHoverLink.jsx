import Link from "next/link";
import styles from "./MoveHoverLink.module.css";

const MoveHoverLink = ({ href, target, rel, children }) => {

    return (
        <Link href={href ? href : "#"} target={target ? target : ""} rel={rel ? rel : ""} className={styles["move-hover-link"]} >
            {children}
        </Link >
    );
};
export default MoveHoverLink;