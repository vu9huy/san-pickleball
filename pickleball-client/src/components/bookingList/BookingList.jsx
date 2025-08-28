
import styles from "./BookingList.module.css";
import convertTimeObject from "@/utils/time/convertTimeObject";
import DataTable from "react-data-table-component";
import BookingListManageAction from "./bookingListManageAction/BookingListManageAction";
import BookingListType from "./bookingListType/BookingListType";
import { useEffect, useState } from "react";
import BookingFilter from "./bookingFilter/BookingFilter";
import BookingModal from "./bookingModal/BookingModal";
import { useForm } from "react-hook-form";
import { useCreateBookingFetchingApi, useDeleteBookingByIdFetchingApi, useEditBookingByIdFetchingApi } from "@/api/serverApi/callApi";
import BookingState from "./bookingState/BookingState";

const bookingDefault = {
    "court": {
        "id": "",
        "number": 1
    },
    "disabled": {
        "value": false,
        "dates": []
    },
    "bookingInfo": {
        "startTime": {},
        "endTime": {},
        "date": "",
        "type": "flexible"
    }
};

const bookingFilter = (bookings, selectedCourtNumber) => {
    const bookingFiltered = bookings.filter(booking => {
        if (selectedCourtNumber.value === 0) return true;
        return booking.court.number === selectedCourtNumber.value;
    });
    return bookingFiltered;
};

const BookingList = ({ user, courtId, selectedDate, bookings, refetchGetBookingByCourtId, numberOfCourts = 0, selectedCourtNumber, setSelectedCourtNumber, openingTime, closingTime }) => {

    const [bookingFiltered, setBookingFiltered] = useState(bookings);

    useEffect(() => {
        const bookingFiltered = bookingFilter(bookings, selectedCourtNumber);
        setBookingFiltered(bookingFiltered);
    }, [bookings, selectedCourtNumber]);

    const [selectedBooking, setSelectedBooking] = useState(bookingDefault);
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleCreateModal = () => {
        // Reset value when closed
        if (createModal) {
            setSelectedBooking(bookingDefault);
            // Reset form data
            reset(bookingDefault);
        }
        setCreateModal(!createModal);
    };

    const toggleDeleteModal = () => {
        // Reset value when closed
        if (deleteModal) {
            setSelectedBooking(bookingDefault);
            // Reset form data
            reset(bookingDefault);
        }
        setDeleteModal(!deleteModal);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        trigger,
        control,
        watch,
        reset
    } = useForm({
        mode: "onChange",
        criteriaMode: "all",
        defaultValues: selectedBooking ? selectedBooking : bookingDefault
    });

    useEffect(() => {
        if (selectedBooking) {
            reset(selectedBooking);
        }
    }, [selectedBooking]);

    const { mutateAsync: createBookingMutateAsync, isPending: createBookingLoading } = useCreateBookingFetchingApi();
    const { mutateAsync: editBookingMutateAsync, isPending: editBookingLoading } = useEditBookingByIdFetchingApi();
    const { mutateAsync: deleteBookingMutateAsync, isPending: deleteBookingLoading } = useDeleteBookingByIdFetchingApi();

    const onSubmit = async (data) => {
        const newData = { ...data };
        newData.court.id = courtId;
        newData.bookingInfo.creator = {
            id: user.id,
            name: user.name
        };
        if (newData.bookingInfo.type === "flexible") {
            delete newData.bookingInfo.day;
            newData.bookingInfo.date = selectedDate;
        }
        if (newData.bookingInfo.type === "fixed_day") {
            delete newData.bookingInfo.date;
            newData.bookingInfo.day = selectedDate.getDay();
        }
        // console.log("newData443", newData);
        // return;
        const response = selectedBooking?.court?.id ? await editBookingMutateAsync({ bookingId: data.id, bookingData: newData }) : await createBookingMutateAsync({ bookingData: newData });
        // Refetch booking data
        refetchGetBookingByCourtId();
        // Close modal
        toggleCreateModal();
    };

    const handleDeleteBooking = async () => {
        const response = await deleteBookingMutateAsync({ bookingId: selectedBooking?.id });
        // Refresh data
        refetchGetBookingByCourtId();
        // Close modal
        toggleDeleteModal();
    };

    const columns = [
        {
            name: <h3 className={styles["booking-list-title"]}>Stt</h3>,
            selector: (row, index) => <span className={styles["booking-list-content"]}>{index + 1}</span>,
            // sortable: true,
            minWidth: "20px",
            maxWidth: "100px",
            center: true
        },
        {
            name: <h3 className={styles["booking-list-title"]}>Sân</h3>,
            selector: (row, index) => <span className={styles["booking-list-content"]}>Sân {row.court.number}</span>,
            minWidth: "80px",
            maxWidth: "160px",
            center: true
        },
        {
            name: <h3 className={styles["booking-list-title"]}>Thời gian</h3>,
            selector: row => <span className={styles["booking-list-content"]}>{convertTimeObject(row.bookingInfo.startTime)} - {convertTimeObject(row.bookingInfo.endTime)}</span>,
            // sortable: true
            minWidth: "120px",
            center: true
        },
        {
            name: <h3 className={styles["booking-list-title"]}>Loại ca</h3>,
            selector: row => <BookingListType type={row.bookingInfo.type} day={row.bookingInfo.day} />,
            center: true,
            minWidth: "180px"
            // width: "100px"
            // sortable: true
        },
        {
            name: <h3 className={styles["booking-list-title"]}>Trạng thái</h3>,
            selector: row => <BookingState bookingState={row.disabled} selectedDate={selectedDate} />,
            center: true,
            minWidth: "100px"
        },
        {
            name: <h3 className={styles["booking-list-title"]}>Ghi chú</h3>,
            selector: row => <span className={styles["booking-list-content"]}>{row.bookingInfo.note}</span>
            // maxWidth: "400px",
            // with: "100%"
            // width: "200px"
            // sortable: true
        },
        {
            name: <h3 className={`${styles["booking-list-title"]} ${styles["booking-list-action-title"]}`}>Hành động</h3>,
            selector: row => <BookingListManageAction bookingId={row.id} bookingData={bookingFiltered} toggleCreateModal={toggleCreateModal} setSelectedBooking={setSelectedBooking} toggleDeleteModal={toggleDeleteModal} />,
            width: "200px",
            center: true
            // sortable: true
        }
    ];

    return (
        <div className={styles["booking-list-container"]}>
            <BookingFilter
                bookings={bookings}
                setBookingFiltered={setBookingFiltered}
                numberOfCourts={numberOfCourts}
                selectedCourtNumber={selectedCourtNumber}
                setSelectedCourtNumber={setSelectedCourtNumber} />
            <div className={styles["booking-list-items"]}>
                <DataTable
                    columns={columns}
                    data={bookingFiltered}
                    noDataComponent={"Chưa có lịch đặt"}
                    // pagination
                    // selectableRows
                    highlightOnHover
                    theme="default"
                />
            </div>
            <div>
                {createModal || deleteModal ? <BookingModal
                    bookings={bookings}
                    openingTime={openingTime}
                    closingTime={closingTime}
                    selectedDate={selectedDate}
                    selectedBooking={selectedBooking}
                    createModal={createModal}
                    toggleCreateModal={toggleCreateModal}
                    deleteModal={deleteModal}
                    toggleDeleteModal={toggleDeleteModal}
                    numberOfCourts={numberOfCourts}
                    handleDeleteBooking={handleDeleteBooking}
                    // Form props
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    trigger={trigger}
                    watch={watch}
                    control={control}
                    errors={errors}
                /> : ""}
            </div>
            <div className="">
                <button className="button" onClick={toggleCreateModal}>Thêm lịch</button>
            </div>
        </div>
    );
};

export default BookingList;