import React from "react";
import styles from "./Logo.module.css";
import "@/fonts/localFonts.css";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {

    return (
        <Link href={"/"} className={styles["logo-container"]}>
            {/* <img src={"/images/logo-fit-96x96.webp"} alt="logo" width={45} height={45} /> */}
            <Image src={"/images/logo-fit-96x96.webp"} alt="logo" width={45} height={45} />
            <span className={styles["text-logo"]}>
                Sân Pickleball
            </span>
        </Link>
    );
};
export default Logo;