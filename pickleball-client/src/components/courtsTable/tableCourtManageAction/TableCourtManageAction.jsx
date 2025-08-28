import styles from "./TableCourtManageAction.module.css";

const getCourtFromId = (courtId, courstData) => {
    const court = courstData.find(court => court.id === courtId);
    return court;
};

const TableCourtManageAction = ({ courtId, courstData, setSelectedCourt, toggleCreateModal }) => {

    const handleEditCourt = () => {
        const editCourt = getCourtFromId(courtId, courstData);
        setSelectedCourt(editCourt);
        toggleCreateModal();
    };

    const handleDeleteCourt = () => {
        console.log("handleDeleteCourt courtId", courtId);
    };

    return (
        <div className={styles["table-court-manage-action"]}>
            <button className="button" onClick={handleEditCourt}>Sửa</button>
            <button className="button dangerous" onClick={handleDeleteCourt}>Xóa</button>
        </div>
    );
};
export default TableCourtManageAction;