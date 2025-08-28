import { isSameDay } from "date-fns";

const BookingState = ({ bookingState, selectedDate }) => {
    return (
        <div className={"booking-state-container"}>
            {
                bookingState?.value && isSameDay(bookingState.dates[0], selectedDate) ?
                    <span>Tạm dừng</span> :
                    <span>Hoạt động</span>
            }
        </div>
    );
};
export default BookingState;