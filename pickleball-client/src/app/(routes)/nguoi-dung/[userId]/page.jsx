"use client";

import styles from "./page.module.css";
import convertRole from "@/utils/userdata/convertRole";
import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import EmailVerification from "@/components/emailVerify/EmailVerification";
import NotFoundComp from "@/components/error/notFound/NotFoundComp";

const NguoiDung = ({ params: { userId } }) => {

    let userData = null;
    const { data: response, isPending } = useGetUserFetchingApi(userId);

    if (userId && response?.status == 200) {
        userData = response?.data || null;
    }
    // console.log("userDatadfdfd", userData);
    // if (userId && response?.status == 200) {
    //     userData = response?.data || null;
    // }
    if (isPending) return "loading...";
    if (response?.status === 404 && !isPending || !userData) return <NotFoundComp type={"user"} />;

    return (
        <div className={`${styles["nguoi-dung-container"]} page-width`}>
            {userData.isVerifiedEmail ? null : <EmailVerification />}
            <div className={styles["nguoi-dung-info-container"]}>
                <div className={styles["nguoi-dung-field"]}>
                    <label>Tên:</label>
                    <input type="text" disabled={true} className="input" value={userData?.name} />
                </div>
                <div className={styles["nguoi-dung-field"]}>
                    <label>Email:</label>
                    <input type="email" disabled={true} className="input" value={userData?.email} />
                </div>
                <div className={styles["nguoi-dung-field"]}>
                    <label>Vai trò:</label>
                    <input type="text" disabled={true} className="input" value={convertRole(userData?.role)} />
                </div>
            </div>
        </div>
    );
};

export default NguoiDung;