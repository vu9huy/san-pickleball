import { useGetCourtByListIdFetchingApi } from "@/api/serverApi/callApi";
import styles from "./BookingManager.module.css";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import { reactSelectCustomStyles } from "@/libs/reactSelect/customStyles";
import CourtBooking from "../courtInfoComponents/courtBooking/CourtBooking";

const BookingManager = ({ user }) => {

    const courts = user?.courts || [];
    const { data: response, isPending, isError, refetch: refetchGetCourtByListId } = useGetCourtByListIdFetchingApi(courts);
    const courtsData = response?.data?.results || [];

    const courtOptions = courtsData?.map(court => {
        return {
            label: court.name,
            value: court.id,
            ...court
        };
    });

    const defaultCourt = courtOptions[0] ? courtOptions[0] : null;

    const [selectedCourt, setSelectedCourt] = useState(defaultCourt);

    useEffect(() => {
        if (courtOptions.length > 0 && !selectedCourt) {
            setSelectedCourt(courtOptions[0]);
        }
    }, [courtOptions]);

    const handleChangeCourt = (option) => {
        setSelectedCourt(option);
    };

    return (
        <div className={styles["booking-manager-container"]}>
            <h3>Chọn sân</h3>
            <ReactSelect
                value={selectedCourt}
                onChange={handleChangeCourt}
                options={courtOptions}
                styles={reactSelectCustomStyles}
                placeholder="Chọn sân"
            />

            <h2>{selectedCourt?.label}</h2>

            <div className="">
                <CourtBooking
                    courtId={selectedCourt?.id}
                    numberOfCourts={selectedCourt?.numberOfCourts}
                    availability={selectedCourt?.availability}
                    user={user}
                    isAdmin={true} />
            </div>
        </div>
    );
};

export default BookingManager;