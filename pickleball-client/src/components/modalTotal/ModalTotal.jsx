import Loading from "../loading/Loading";
import styles from "./ModalTotal.module.css";

const ModalTotal = (props) => {
    const {
        show,
        onClose,
        children,
        title,
        primaryButtonDisable = false,
        loading,
        primaryButtonText = "Lưu",
        primaryButtonType = "",
        primaryAction,
        secondaryButtonDisable = false,
        secondaryButtonText = "Hủy",
        secondaryAction } = props;
    if (!show) {
        return null;
    }

    const handleBackdropClick = (e) => {
        // if (e.target === e.currentTarget) {
        //     onClose();
        // }
        onClose();
    };

    return (
        <div className={styles["modal-total-backdrop"]}>
            <div className={`${styles["modal-total-container"]} ${styles[show ? "show" : ""]} ${show ? "show" : ""}`}>
                <div className={styles["modal-total-header"]}>
                    <h2>{title}</h2>
                    <button className={styles["modal-total-close"]} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={`${styles["modal-total-body"]} custom-scroll-bar`} >
                    {children}
                </div>
                <div className={styles["modal-total-footer"]}>
                    <button
                        className={`${styles["modal-total-secondary-button"]} secondary-button ${secondaryButtonDisable || loading ? "disable" : ""} `}
                        onClick={secondaryAction}
                    >
                        {secondaryButtonText}
                    </button>
                    <button
                        className={`${styles["modal-total-primary-button"]} button ${primaryButtonType} ${primaryButtonDisable || loading ? "disable" : ""}`}
                        onClick={primaryAction}
                    >
                        {loading ? <Loading width={"70%"} /> : primaryButtonText}
                    </button>
                </div>
            </div>
            <div
                className={`${styles["modal-total-overlay"]} ${styles[show ? "show" : ""]}`}
                onClick={handleBackdropClick}
            />
        </div>
    );
};

export default ModalTotal;
