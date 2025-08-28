import Link from "next/link";
import styles from "./Tag.module.css";

const Tag = ({ url, tagName, tagType }) => {

    return (
        <Link href={url} className={`${styles["tag"]} ${styles[tagType]} unstyled`}>{tagName}</Link>
    );
};
export default Tag;