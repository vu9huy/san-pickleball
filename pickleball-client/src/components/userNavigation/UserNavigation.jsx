"use client";

import styles from "./UserNavigation.module.css";
import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import { useRouter, usePathname } from "next/navigation";

const UserNavigation = ({ userId }) => {
    const router = useRouter();
    const pathname = usePathname();

    let userData = null;
    const { data: response, isPending } = useGetUserFetchingApi(userId);
    if (userId && response?.status == 200) {
        userData = response?.data || null;
    }
    if (!userData) return null;

    const userPath = `/nguoi-dung/${userId}`;

    const userNavigations = [
        { value: userPath, label: "Người dùng" },
        { value: `${userPath}/doi-mat-khau`, label: "Đổi mật khẩu" },
        { value: `${userPath}/thanh-ly`, label: "Thanh lý" }
    ];

    if (userData.role) {
        userNavigations.push(
            { value: `${userPath}/quan-ly-san`, label: "Quản lý sân" },
            { value: `${userPath}/quan-ly-lich`, label: "Quản lý lịch" }
        );
    }

    const handleNavigation = (e) => {
        router.push(e.target.value);
    };

    return (
        <div className={`${styles["user-navigation-container"]} page-width`}>
            <p>Quản lý tài khoản:</p>
            <select onChange={handleNavigation} value={pathname}>
                {userNavigations.map(navigation => <option value={navigation.value} key={navigation.value} >
                    {navigation.label}
                </option>)}
            </select>
        </div>
    );
};

export default UserNavigation;