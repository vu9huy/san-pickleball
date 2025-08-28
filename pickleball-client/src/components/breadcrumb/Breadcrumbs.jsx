"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import breadcrumbsData from "@/data/breadcrumbs/breadcrumbsData.json";
import styles from "./Breadcrumbs.module.css";

const checkNoBreadcrumbPath = (paths) => {
    const noBreadcrumbPath = [
        "nguoi-dung",
        "dang-nhap",
        "dang-ky",
        "doi-mat-khau",
        "email-verified"
    ];
    const checkIncludes = noBreadcrumbPath.find(path => paths.includes(path));
    return !!checkIncludes;
};

const Breadcrumbs = () => {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);
    pathNames.unshift("");
    const pathItems = pathNames.map((path, index) => ({
        name: breadcrumbsData[path],
        path: pathNames.slice(1, index + 1).join("/")
    }));

    if (pathItems.length <= 1 || checkNoBreadcrumbPath(paths)) return null;

    return (
        <ol className={styles["bread-crumb-container"]}>
            {pathItems.map((item, index) => (
                <li key={index} className={`${styles["bread-crumb-item"]} ${styles[index === pathItems.length - 1 ? "active" : ""]}`}>
                    <Link href={`/${item.path}`}>{item.name}</Link>
                    {index < pathItems.length - 1 && item.name ? <span className={styles["bread-crumb-slash"]}>/</span> : null}
                </li>
            ))}
        </ol>
    );
};

export default Breadcrumbs;