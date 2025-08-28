"use client";

import styles from "./CourtBookingDatePicker.module.css";
import DatePickerComp from "@/components/datePicker/DatePickerComp";
import { addDays, subDays } from "date-fns";

const CourtBookingDatePicker = ({ selectingDate }) => {
    return (
        <div className={styles["court-booking-date-picker-container"]}>
            <DatePickerComp minDate={subDays(new Date(), 0)} maxDate={addDays(new Date(), 10)} selectingDate={selectingDate} />
        </div>
    );
};

export default CourtBookingDatePicker;