"use client";

import UserSettings from "@/components/userSettings/UserSettings";
import ModalComp from "../ModalComp";
import styles from "./UserModal.module.css";
import { useRef, useState } from "react";
import UserAvatar from "@/components/userAvatar/UserAvatar";

const UserModal = ({ userData }) => {
    const modalRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles["user-modal-container"]} onMouseDown={openModal}>
            <div className={styles["user-modal-show"]}>
                <UserAvatar name={userData?.name} />
            </div>
            <div className={`${styles["user-modal-hidden"]} ${styles[isModalOpen ? "display" : ""]}`}>
                <ModalComp onClose={closeModal} modalRef={modalRef}>
                    <div className={styles["user-modal-menu"]} ref={modalRef}>
                        <UserSettings />
                    </div>
                </ModalComp>
            </div>
        </div>
    );
};
export default UserModal;
