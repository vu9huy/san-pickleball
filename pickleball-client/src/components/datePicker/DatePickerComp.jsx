"use client";

import "./DatePickerComp.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays } from "date-fns";

const DatePickerComp = ({ defaultDate, minDate, maxDate, selectingDate, includeDates }) => {
    const today = new Date();
    const [date, setDate] = useState(defaultDate || new Date());

    const selectDateHandler = (date) => {
        setDate(date);
        selectingDate(date);
    };

    return (
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            locale={vi}
            onChange={selectDateHandler}
            minDate={minDate || subDays(today, 0)}
            maxDate={maxDate || addDays(today, 7)}
            includeDates={includeDates}
            className="input custom-time-picker"
        // todayButton={date}
        />
    );
};

export default DatePickerComp;
