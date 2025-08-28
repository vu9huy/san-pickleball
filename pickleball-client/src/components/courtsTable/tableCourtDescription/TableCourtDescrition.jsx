import styles from "./TableCourtDescrition.module.css";

const TableCourtDescription = ({ description }) => {

    return (
        <p className={styles["table-court-description"]}>{description}</p>
    );
};
export default TableCourtDescription;