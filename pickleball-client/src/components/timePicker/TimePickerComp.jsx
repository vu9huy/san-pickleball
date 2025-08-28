"use client";

import "./TimePickerComp.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { reactSelectTimeCustomStyles } from "@/libs/reactSelect/customStyles";
import ReactSelect from "react-select";


// Check if a time is included in the list
const isTimeIncluded = (time, includeTimes) => {
    if (!includeTimes || includeTimes.length === 0) return true;
    return includeTimes.some(
        (includeTime) =>
            includeTime.hours === time.hours && includeTime.minutes === time.minutes
    );
};

// Check if a time is excluded in the list
const isTimeExcluded = (time, excludeTimes) => {
    if (!excludeTimes || excludeTimes.length === 0) return false;
    return excludeTimes.some(
        (excludeTime) =>
            excludeTime.hours === time.hours && excludeTime.minutes === time.minutes
    );
};

// Filter time options based on include/exclude lists
const filterTimeOptions = (timeOptions, includeTimes, excludeTimes) => {
    return timeOptions.map((option) => {
        const { hours, minutes } = option.value;
        const time = { hours, minutes };
        const isDisabled = !isTimeIncluded(time, includeTimes) || isTimeExcluded(time, excludeTimes);

        return { ...option, isDisabled };
    });
};

const formatTime = ({ hours, minutes }) => {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = {
        value: {
            hours: hours,
            minutes: minutes
        },
        label: `${formattedHours}:${formattedMinutes}`
    };
    return formattedTime;
};

const generateTimeOptions = ({ startTime, endTime }) => {
    const defaultStartTime = { hours: 0, minutes: 0 };
    const defaultEndTime = { hours: 24, minutes: 0 };

    const startTimeInFunc = startTime || defaultStartTime;
    const endTimeInFunc = endTime || defaultEndTime;

    const timeOptions = [];
    const incrementMinutes = 30;
    let currentHour = startTimeInFunc.hours;
    let currentMinute = startTimeInFunc.minutes;
    while (true) {
        timeOptions.push(formatTime({ hours: currentHour, minutes: currentMinute }));
        currentMinute += incrementMinutes;
        if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
        }
        if (currentHour === endTimeInFunc.hours && currentMinute === endTimeInFunc.minutes) {
            // if (currentHour === 24) {
            //     currentHour = 0;
            // }
            timeOptions.push(formatTime({ hours: currentHour, minutes: currentMinute }));
            break;
        }
    }
    return timeOptions;
};

const TimePickerComp = ({ timeDefault, field, includeTimes, excludeTimes, minTime, maxTime, isDisabled }) => {
    const timeOptions = generateTimeOptions({ startTime: minTime, endTime: maxTime });
    const filteredOptions = filterTimeOptions(timeOptions, includeTimes, excludeTimes);
    const timeDefaultHandled = !timeDefault.hours && timeDefault.hours != 0 ? filteredOptions[0] : formatTime(timeDefault);

    const [selectedTime, setSelectedTime] = useState(timeDefaultHandled);

    const handleSelectTime = (selectedOption) => {
        setSelectedTime(selectedOption);
        field.onChange(selectedOption.value);
    };

    return (
        <ReactSelect
            options={filteredOptions}
            onChange={(value) => handleSelectTime(value)}
            value={selectedTime}
            styles={reactSelectTimeCustomStyles}
            getOptionValue={(option) => `${option.value.hours}:${option.value.minutes}`}
            getOptionLabel={(option) => option.label}
            isDisabled={isDisabled}
            placeholder="Chọn thời gian"
        />
    );
};

export default TimePickerComp;
