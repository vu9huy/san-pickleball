"use client";

import CourtTable from "@/components/courtsTable/CourtTable";
import styles from "./page.module.css";
import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import { checkOwnerRoles } from "@/utils/userdata/checkRoles";
import { useRouter } from "next/navigation";

const QuanLySan = ({ params: { userId } }) => {
    const { push } = useRouter();
    const { data: response, isPending, isError, refetch: refetchGetUser } = useGetUserFetchingApi(userId);
    const user = response?.data;

    // console.log("user", user);

    if (isPending) return "loading...";
    if (!user || isError) return "Có lỗi xảy ra";
    if (!checkOwnerRoles(user?.role)) return push(`/nguoi-dung/${userId}`);

    return (
        <div className={`${styles["quan-ly-san-container"]} page-width`}>
            <div className={styles["quan-ly-san-list-court"]}>
                <CourtTable user={user} refetchGetUser={refetchGetUser} />
            </div>
        </div>
    );
};
export default QuanLySan;