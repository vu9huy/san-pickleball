import styles from "./BookingListManageAction.module.css";

const getBookingFromId = (bookingId, bookingData) => {
    const booking = bookingData.find(booking => booking.id === bookingId);
    return booking;
};

const BookingListManageAction = ({ bookingId, bookingData, setSelectedBooking, toggleCreateModal, toggleDeleteModal }) => {

    const handleEditBooking = () => {
        const editBooking = getBookingFromId(bookingId, bookingData);
        setSelectedBooking(editBooking);
        toggleCreateModal();
    };

    const handleDeleteBooking = () => {
        const deleteBooking = getBookingFromId(bookingId, bookingData);
        setSelectedBooking(deleteBooking);
        toggleDeleteModal();
    };

    return (
        <div className={styles["booking-list-manage-action"]}>
            <button className="button" onClick={handleEditBooking}>Sửa</button>
            <button className="button dangerous" onClick={handleDeleteBooking}>Xóa</button>
        </div>
    );
};
export default BookingListManageAction;