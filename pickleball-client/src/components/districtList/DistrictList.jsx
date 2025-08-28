"use client";

import styles from "./DistrictList.module.css";
import getProvinceFromSlug from "@/utils/provinces/getProvinceFromSlug";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DistrictList = ({ provinceSlug }) => {
    const pathname = usePathname();
    const pathnameSplit = pathname.split("/");
    const districtSlug = pathnameSplit[3] || "";

    const province = getProvinceFromSlug(provinceSlug);
    const districts = province?.districts || [];

    return (
        <div className={styles["district-list-container"]}>
            {districts.map(district => (
                <div className={`${styles["district-list-item"]} ${styles[districtSlug === district.slug ? "active" : ""]}`} key={district.slug}>
                    <Link prefetch={false} href={`/tinh-thanh/${provinceSlug}/${district.slug}`}>{district.label}</Link>
                </div>
            ))}
        </div>
    );
};

export default DistrictList;