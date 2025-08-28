import checkIsMaxCourt from "@/utils/userdata/checkMaxCourt";
import styles from "./TableTitle.module.css";
import Link from "next/link";

const TableTitle = ({ title, user, toggleCreateModal }) => {


    return (
        <div className={styles["table-title-container"]}>
            <h3>{title}</h3>
            <div className={styles["table-title-create-court"]}>
                <div className={styles["table-title-court-button"]}>
                    {/* <button className={"button"}>
                        <Link href={"quan-ly-lich"}>Quản lý lịch</Link>
                    </button> */}
                    <button onClick={toggleCreateModal} className={`button ${checkIsMaxCourt(user) ? "disable" : ""}`}>Thêm sân</button>
                </div>
                {checkIsMaxCourt(user) ? <p className="error-message">Bạn đã đạt tới giới hạn số lượng sân ({user?.courts?.length}/{user?.maxCourt} sân), liên hệ quản trị viên để mở thêm</p> : ""}
            </div>
        </div>
    );
};
export default TableTitle;