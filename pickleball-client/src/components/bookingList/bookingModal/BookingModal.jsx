import ModalTotal from "@/components/modalTotal/ModalTotal";
import styles from "./BookingModal.module.css";
import BookingForm from "../bookingForm/BookingForm";

const BookingModal = (props) => {

    const {
        selectedDate,
        selectedBooking,
        createModal,
        toggleCreateModal,
        deleteModal,
        toggleDeleteModal,
        bookings,
        openingTime,
        closingTime,
        numberOfCourts,
        handleDeleteBooking,
        // Form props
        register,
        handleSubmit,
        onSubmit,
        trigger,
        watch,
        control,
        errors
    } = props;


    return (
        <>
            <ModalTotal
                title={selectedBooking?.court?.id ? "Sửa lịch" : "Thêm lịch"}
                show={createModal}
                primaryAction={handleSubmit(onSubmit)}
                secondaryAction={toggleCreateModal}
                onClose={toggleCreateModal}
            >
                <BookingForm
                    bookings={bookings}
                    openingTime={openingTime}
                    closingTime={closingTime}
                    selectedBooking={selectedBooking}
                    selectedDate={selectedDate}
                    numberOfCourts={numberOfCourts}

                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    trigger={trigger}
                    watch={watch}
                    control={control}
                    errors={errors}
                />
            </ModalTotal>
            <ModalTotal
                title={"Xóa lịch"}
                show={deleteModal}
                primaryButtonText={"Xóa"}
                primaryButtonType={"dangerous"}
                primaryAction={handleDeleteBooking}
                secondaryAction={toggleDeleteModal}
                onClose={toggleDeleteModal}
            >
                <h4 className={styles["booking-form-delete-title"]}>Bạn có chắc chắn muốn xóa lịch này?</h4>
                <BookingForm
                    bookings={bookings}
                    openingTime={openingTime}
                    closingTime={closingTime}
                    selectedBooking={selectedBooking}
                    selectedDate={selectedDate}
                    numberOfCourts={numberOfCourts}
                    readOnly={true}

                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    trigger={trigger}
                    watch={watch}
                    control={control}
                    errors={errors}
                />
            </ModalTotal>
        </>
    );
};

export default BookingModal;