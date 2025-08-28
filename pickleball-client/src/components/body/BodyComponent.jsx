"use client";

import FacebookChat from "../facebookChat/FacebookChat";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { usePathname } from "next/navigation";

const hiddenNavbarPaths = [
    "/dang-nhap",
    "/dang-ky"
];

const BodyComponent = ({ children }) => {

    const pathname = usePathname();
    const checkHiddenNavbar = hiddenNavbarPaths.includes(pathname);

    return (
        <div className="">
            <div className="container">
                {!checkHiddenNavbar ? <Navbar /> : ""}
                <div className="content-container">
                    <div className="content-wrapper">
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
            <FacebookChat />
        </div>
    );
};

export default BodyComponent;