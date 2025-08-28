import React from "react";
import styles from "./Footer.module.css";
import { HeaderComp } from "../header/HeaderComp";
import MoveHoverLink from "../moveHoverLink/MoveHoverLink";
import { IconSprites1 } from "../iconSprites/IconSprites";
import Link from "next/link";

const Footer = () => {

    return (
        <div className={`${styles["footer-container"]}`}>
            <div className={styles["footer-wrapper"]}>
                <div className={styles["footer-item"]}>
                    <div className={styles["footer-item-title"]}>
                        <HeaderComp>
                            <span>Sân Pickleball</span>
                        </HeaderComp>
                    </div>
                    <ul className={styles["footer-item-content"]}>
                        <li className={styles["footer-item-content-item"]}>
                            <p>Tìm kiếm và đặt sân</p>
                            <p>pickleball trên toàn quốc</p>
                        </li>
                    </ul>
                </div>
                <div className={styles["footer-item"]}>
                    <div className={styles["footer-item-title"]}>
                        <HeaderComp>
                            <span>Liên hệ hợp tác</span>
                        </HeaderComp>
                    </div>
                    <ul className={styles["footer-item-content"]}>
                        <li className={styles["footer-item-content-item"]}>
                            <MoveHoverLink href={"https://www.facebook.com/people/S%C3%A2n-Pickleball/61561925831015/"} target={"_blank"} rel={"nofollow"}>
                                <span className={styles["footer-item-social-wrapper"]}>
                                    <IconSprites1 id="sprites-icon-facebook" className={styles["footer-item-social-icon"]} width="20px" height="20px" fill="#ffffff" />
                                    Sân Pickleball
                                </span>
                            </MoveHoverLink>
                        </li>
                        <li className={styles["footer-item-content-item"]}>
                            <MoveHoverLink href={"mailto:sanpickleball@gmail.com"} >
                                <span className={styles["footer-item-social-wrapper"]}>
                                    <IconSprites1 id="sprites-icon-gmail" className={styles["footer-item-social-icon"]} width="20px" height="20px" fill="#ffffff" />
                                    sanpickleball@gmail.com
                                </span>
                            </MoveHoverLink>
                        </li>
                        <li className={styles["footer-item-content-item"]}>
                            <MoveHoverLink href={"/privary-policy"}>
                                <span>Privary policy</span>
                            </MoveHoverLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles["coppy-right"]}>
                <Link href="https://www.facebook.com/vu9huy/" target={"_blank"} rel={"nofollow"}><p>@vu9huy©2024</p></Link>
            </div>
        </div>
    );
};
export default Footer;