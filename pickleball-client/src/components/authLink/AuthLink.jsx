"use client";

import { getUserIdFromCookie } from "@/utils/userdata/userdataUtilities";
import UserModal from "../modal/userModal/UserModal";
import styles from "./AuthLink.module.css";
import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import AuthButtons from "../authButtons/AuthButtons";

const AuthLink = ({ }) => {
    let userData = null;
    const userId = getUserIdFromCookie();

    const { data: response, isPending } = useGetUserFetchingApi(userId);

    if (userId && response?.status == 200) {
        userData = response?.data || null;
    }

    return (
        <div className={styles["auth-link-container"]}>
            {userData ?
                <div className={styles["auth-link-profile"]}>
                    <UserModal userData={userData} />
                </div> :
               <AuthButtons/>}
        </div>
    );
};
export default AuthLink;