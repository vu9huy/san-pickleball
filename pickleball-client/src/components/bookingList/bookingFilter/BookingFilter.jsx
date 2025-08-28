import useCourtNumberOptions from "@/customHook/useCourtNumberOptions";
import styles from "./BookingFilter.module.css";
import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
// import { useState } from "react";
import ReactSelect from "react-select";

// const bookingFilter = (bookings, selectedCourtNumber) => {
//     const bookingFiltered = bookings.filter(booking => {
//         if (selectedCourtNumber.value === 0) return true;
//         return booking.court.number === selectedCourtNumber.value;
//     });
//     return bookingFiltered;
// }

const BookingFilter = ({ bookings, setBookingFiltered, numberOfCourts, selectedCourtNumber, setSelectedCourtNumber }) => {

    const {
        courtNumberOptions
    } = useCourtNumberOptions({ numberOfCourts, hasDefaultCourtNumber: true });

    const handleChangeCourtNumber = (option) => {
        setSelectedCourtNumber(option);
        // const bookingFiltered = bookingFilter(bookings, option);
        // setBookingFiltered(bookingFiltered);
    };

    return (
        <div className={styles["booking-list-filter"]}>
            <div className={styles["booking-list-filter-court-number"]}>
                <div className={styles["court-number-select-wrapper"]}>
                    <ReactSelect
                        styles={reactSelectCustomStyles}
                        value={selectedCourtNumber}
                        onChange={handleChangeCourtNumber}
                        options={courtNumberOptions}
                    />
                </div>
            </div>
        </div>
    );
};
export default BookingFilter;