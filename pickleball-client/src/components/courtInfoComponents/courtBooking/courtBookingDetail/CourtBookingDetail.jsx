import convertTimeObject from "@/utils/time/convertTimeObject";
import "./CourtBookingDetail.css";
import timeMinutesToSlots from "@/utils/time/timeMinutesToSlots";

const openTimeDefault = {
    hours: 6,
    minutes: 0
};

const closeTimeDefault = {
    hours: 24,
    minutes: 0
};

const CourtBookingDetail = ({ openingTime = openTimeDefault, closingTime = closeTimeDefault, bookings, courtNumber }) => {

    const totalSlots = closingTime.hours > openingTime.hours ? (closingTime.hours - openingTime.hours) * 2 : (24 + closingTime.hours - openingTime.hours) * 2; // Each slot is 30 minutes
    // const bookedSlots = Array(totalSlots).fill({ slot: null, isBooked: false });

    const bookedSlots = Array(totalSlots).fill().map((el, index) => {
        return {
            slot: index,
            hours: Math.floor(openingTime.hours + timeMinutesToSlots(openingTime.minutes) + index * 0.5) < 24 ? Math.floor(openingTime.hours + timeMinutesToSlots(openingTime.minutes) + index * 0.5) : Math.floor(openingTime.hours + timeMinutesToSlots(openingTime.minutes) + index * 0.5 - 24),
            minutes: openingTime.minutes + index % 2 * 30,
            isBooked: false
        };
    });

    const morningBreakPointTime = 0;

    const afternoonBreakPointTime = 12;
    const afternoonBreakPointSlot = (afternoonBreakPointTime - openingTime.hours + timeMinutesToSlots(openingTime.minutes)) * 2;

    const eveningBreakPointTime = 19;
    const eveningBreakPointSlot = (eveningBreakPointTime - openingTime.hours + timeMinutesToSlots(openingTime.minutes)) * 2;

    const bookingsEnableFiltered = bookings.filter(booking => !booking.disabled.value);
    // Mark booked slots
    bookingsEnableFiltered.forEach((booking) => {
        const startBookingTime = booking?.bookingInfo?.startTime;
        const endBookingTime = booking?.bookingInfo?.endTime;
        if (booking.court.number === courtNumber + 1) {
            const startSlot =
                (startBookingTime?.hours - openingTime.hours) * 2 +
                Math.floor(startBookingTime?.minutes / 30);

            const endSlot =
                (endBookingTime?.hours - openingTime.hours) * 2 +
                Math.floor(endBookingTime?.minutes / 30);

            for (let i = startSlot; i < endSlot; i++) {

                // // CHECK DISABLED BOOKING
                // if (booking.disabled) {
                //     bookedSlots[i]["isBooked"] = false;
                //     break;
                // }

                bookedSlots[i]["isBooked"] = true;
            }
        }
    });

    // console.log("bookedSlots5454", bookedSlots);

    const morningSlots = bookedSlots.slice(0, afternoonBreakPointSlot);
    const afternoonSlots = bookedSlots.slice(afternoonBreakPointSlot, eveningBreakPointSlot);
    const eveningSlots = bookedSlots.slice(eveningBreakPointSlot, bookedSlots.length);

    const daySessions = [
        {
            name: "Sáng",
            slots: morningSlots,
            startTime: convertTimeObject({ hours: openingTime.hours, minutes: openingTime.minutes }),
            endTime: "12:00"
        },
        {
            name: "Chiều",
            slots: afternoonSlots,
            startTime: "12:00",
            endTime: "19:00"
        },
        {
            name: "Tối",
            slots: eveningSlots,
            startTime: "19:00",
            endTime: convertTimeObject({ hours: closingTime.hours, minutes: closingTime.minutes })
        }
    ];

    return (
        <div className="court">
            <div className="court-number">
                <h3>Sân {courtNumber + 1}:</h3>
            </div>
            <div className="day-session-wrapper">
                {daySessions.map((session, index) => {
                    return (
                        <div className="day-session" key={index}>
                            <h4>
                                <p>{session.name}</p>
                                {/* <p>({session.startTime}-{session.endTime})</p> */}
                            </h4>
                            <div className="slots custom-scroll-bar">
                                {session?.slots?.map((slot, index) => {
                                    const afterTime = convertTimeObject({ hours: slot.minutes ? slot.hours + 1 : slot.hours, minutes: slot.minutes ? 0 : 30 });
                                    const time = convertTimeObject({ hours: slot.hours, minutes: slot.minutes });
                                    return (
                                        <div key={index} className={`slot ${slot.isBooked ? "booked" : ""}`}>
                                            <div className="time">
                                                <p>{time}</p>
                                                {/* <span>-</span>
                                                <p>{afterTime}</p> */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                {/* <div className="slots">
                    {bookedSlots.map((slot, index) => {
                        const dayTime = convertTimeObject({ hours: slot.hours, minutes: slot.minutes });
                        return (
                            <div key={index} className={`slot ${slot.isBooked ? "booked" : ""}`}>
                                <div className="day-time time">
                                    <span>{dayTime}</span>
                                    <div className="day-time-reference"></div>
                                </div>
                            </div>
                        );
                    })}
                </div> */}
            </div>
        </div>
    );
};

export default CourtBookingDetail;