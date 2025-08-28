"use client";

import "./TimePickerComp.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, setSeconds } from "date-fns";

const handleDateToTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
        hours,
        minutes
    };
};

const handleMinTime = (minTime) => {
    if (minTime) {
        return setHours(setMinutes(setSeconds(new Date(), 0), minTime.minutes), minTime.hours);
    }
    if (!minTime) {
        return setHours(setMinutes(setSeconds(new Date(), 0), 0), 0);
    }
};

const handleMaxTime = (maxTime) => {
    if (maxTime && maxTime.hours < 24) {
        return setHours(setMinutes(setSeconds(new Date(), 0), maxTime.minutes), maxTime.hours);
    }
    if (maxTime && maxTime.hours >= 24) {
        return setHours(setMinutes(setSeconds(new Date(), 59), 59), 23);
    }
    if (!maxTime) {
        return setHours(setMinutes(setSeconds(new Date(), 59), 59), 23);
    }
};

const TimePickerCompBackup = ({ timeDefault, field, excludeTimes, minTime, maxTime, isDisabled }) => {

    const defaultDate = new Date();
    defaultDate.setHours(timeDefault?.hours || 0);
    defaultDate.setMinutes(timeDefault?.minutes || 0);

    const [date, setDate] = useState(defaultDate);

    const selectTimeHandler = (date) => {
        setDate(date);
        const selectedTime = handleDateToTime(date);
        field.onChange(selectedTime);
    };

    const excludeTimesList = excludeTimes?.map(time => {
        return setHours(setMinutes(new Date(), time.minutes), time.hours);
    }) || [];

    const minTimeHandled = handleMinTime(minTime);
    const maxTimeHandled = handleMaxTime(maxTime);


    return (
        <DatePicker
            disabled={isDisabled}
            selected={date}
            onChange={selectTimeHandler}
            locale={vi}
            className='input time-picker'
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Thời gian"
            dateFormat="HH:mm"
            excludeTimes={excludeTimesList}
            minTime={minTimeHandled}
            maxTime={maxTimeHandled}
        />
    );

};

export default TimePickerCompBackup;
