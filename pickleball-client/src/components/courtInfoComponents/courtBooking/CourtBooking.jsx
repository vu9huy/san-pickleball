"use client";

import { IconSprites1 } from "@/components/iconSprites/IconSprites";
import styles from "./CourtBooking.module.css";
import CourtBookingDetail from "./courtBookingDetail/CourtBookingDetail";
import CourtBookingExplication from "./courtBookingExplication/CourtBookingExplication";
import CourtBookingDatePicker from "./courtBookingDatePicker/CourtBookingDatePicker";
import { useState } from "react";
import { useGetBookingByCourtIdFetchingApi } from "@/api/serverApi/callApi";
import convertTimeObject from "@/utils/time/convertTimeObject";
import BookingList from "@/components/bookingList/BookingList";
import { formatDateCustom } from "@/utils/time/dateFns";

const defaultCourtNumber = { label: "Tất cả sân", value: 0 };

const CourtBooking = ({ courtId, numberOfCourts, availability, isAdmin, user }) => {

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);

    const { data: response, isPending, isError, refetch: refetchGetBookingByCourtId } = useGetBookingByCourtIdFetchingApi(courtId, selectedDate.toISOString());
    const bookings = response?.data?.results || [];

    const courtsNumber = Array.from(Array(numberOfCourts).keys());

    const selectedDay = selectedDate.getDay();
    const availabilityMatch = availability?.find(available => available.days.includes(selectedDay));

    const selectingDate = (date) => {
        setSelectedDate(date);
    };

    const daySessionsTime = [
        {
            name: "Buổi sáng",
            startTime: convertTimeObject({ hours: availabilityMatch?.openTime?.hours, minutes: availabilityMatch?.openTime?.minutes }),
            endTime: "12:00"
        },
        {
            name: "Buổi chiều",
            startTime: "12:00",
            endTime: "19:00"
        },
        {
            name: "Buổi tối",
            startTime: "19:00",
            endTime: convertTimeObject({ hours: availabilityMatch?.closeTime?.hours, minutes: availabilityMatch?.closeTime?.minutes })
        }
    ];

    const [selectedCourtNumber, setSelectedCourtNumber] = useState(defaultCourtNumber);


    return (
        <div className={`${styles["court-booking-container"]} ${!isAdmin ? styles["border-top"] : ""}`}>

            <div className={styles["court-booking-header"]}>
                <p className={styles["court-detail-body-info-block-label"]}>
                    <IconSprites1 id="sprites-icon-schedule" width="18px" height="20px" fill="#99de47" />
                    <span>&nbsp;Lịch đặt: {formatDateCustom(selectedDate, "EEEE - dd/MM/yyyy")}</span>
                </p>
            </div>

            <div className={styles["court-booking-container-wrapper-info"]}>
                <CourtBookingDatePicker selectingDate={selectingDate} />
                <CourtBookingExplication />
            </div>

            {isAdmin ?
                <div className="">
                    <BookingList
                        user={user}
                        courtId={courtId}
                        bookings={bookings}
                        refetchGetBookingByCourtId={refetchGetBookingByCourtId}
                        openingTime={availabilityMatch?.openTime}
                        closingTime={availabilityMatch?.closeTime}
                        selectedDate={selectedDate}
                        numberOfCourts={numberOfCourts}
                        selectedCourtNumber={selectedCourtNumber}
                        setSelectedCourtNumber={setSelectedCourtNumber} />
                </div>
                : ""}
            {/* {isAdmin ?
                <h2>Xem trước:</h2> : ""} */}

            {/* <div className={styles["court-booking-container-day-sessions-time"]}>
                <label>Thời gian hoạt động:</label>
                <div className={styles["court-booking-container-day-sessions-time-detail"]}>
                    {daySessionsTime.map((session, index) => <p key={index}>{session.name}: {session.startTime} - {session.endTime}</p>)}
                </div>
            </div> */}
            <div className={styles["court-booking-wrapper"]}>
                {selectedCourtNumber.value === 0 ? courtsNumber.map((courtNumber) => (
                    <CourtBookingDetail
                        key={courtNumber}
                        courtNumber={courtNumber}
                        bookings={bookings}
                        openingTime={availabilityMatch?.openTime}
                        closingTime={availabilityMatch?.closeTime}
                    />
                )) : <CourtBookingDetail
                    courtNumber={selectedCourtNumber.value - 1}
                    bookings={bookings}
                    openingTime={availabilityMatch?.openTime}
                    closingTime={availabilityMatch?.closeTime}
                />}
            </div>
        </div>
    );
};

export default CourtBooking;