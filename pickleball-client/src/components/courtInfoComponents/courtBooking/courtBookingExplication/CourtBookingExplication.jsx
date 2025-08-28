import styles from "./CourtBookingExplication.module.css";

const explicationList = [
    {
        label: "Trống",
        color: "#ffffff"
    },
    {
        label: "Đã đặt",
        color: "#8ac93d"
    },
    {
        label: "Khóa",
        color: "#a30202"
    }
];

const CourtBookingExplication = () => {

    return (
        <div className={styles["court-booking-explication-container"]}>
            {explicationList.map((explication, index) => {
                return (
                    <div key={index} className={styles["court-booking-explication-item"]}>
                        <div className={styles["court-booking-explication-item-color"]} style={{ backgroundColor: explication.color }}></div>
                        <span className={styles["court-booking-explication-item-label"]}> {explication.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default CourtBookingExplication;