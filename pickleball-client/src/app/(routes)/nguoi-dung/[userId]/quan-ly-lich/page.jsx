"use client";

import styles from "./page.module.css";
import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import BookingManager from "@/components/bookingManager/BookingManager";
import { checkOwnerRoles } from "@/utils/userdata/checkRoles";
import { useRouter } from "next/navigation";

const QuanLyLich = ({ params: { userId } }) => {
    const { push } = useRouter();
    const { data: response, isPending, isError, refetch: refetchGetUser } = useGetUserFetchingApi(userId);
    const user = response?.data;

    if (isPending) return "loading...";
    if (!user || isError) return "Có lỗi xảy ra";
    if (!checkOwnerRoles(user?.role)) return push(`/nguoi-dung/${userId}`);

    return (
        <div className={`${styles["quan-ly-lich-container"]} page-width`}>
            <BookingManager user={user} />
        </div>
    );
};
export default QuanLyLich;