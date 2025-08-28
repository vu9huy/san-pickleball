import { useState } from "react";
// import styles from "./ModalTotal2.module.css";
import "./ModalTotal2.css";

export const ModalDialog2 = ({ open, handleConfirm, children }) => {
    return (
        <div className="modal-dialog-container">
            <div className={open ? "confirm show" : "confirm"}>
                <div className="confirm-content">
                    {children}
                </div>
            </div>
            <div
                className={"overlay"}
                onClick={() => handleConfirm(false)}
            />
        </div>
    );
};

const ModalTotal2 = () => {
    const [open, setOpen] = useState(false);

    const handleConfirm = (result) => {
        setOpen(false);
    };

    return (
        <div className="modal-total-2-container">
            <button className="button" onClick={() => setOpen(true)}>
                OPEN
            </button>
            <ModalDialog2
                open={open}
                handleConfirm={handleConfirm}
            >
                <h1>Test modal</h1>
                <div className="">aaaaaaaaaa</div>
            </ModalDialog2>
        </div>
    );
};

export default ModalTotal2;