import getDayOfWeek from "@/utils/time/getDayOfWeek";
import styles from "./BookingListType.module.css";

const bookingTypeLabel = {
    "flexible": "Link hoạt",
    "fixed_day": "Cố định"
};

const BookingListType = ({ type, day }) => {

    return (
        <div className={styles["booking-list-type-container"]}>
            {day ?
                <div className={styles["booking-list-type-fixed"]}>
                    <p>{bookingTypeLabel[type]}</p>
                    <p>({getDayOfWeek(day)} hàng tuần)</p>
                    {/* <p> hàng tuần)</p> */}
                </div> :
                <p className={styles["booking-list-type-flexible"]}>{bookingTypeLabel[type]}</p>}
        </div>
    );
};
export default BookingListType;