"use client";

import React, { useEffect } from "react";
import "./ModalComp.css";

const ModalComp = ({ onClose, children, modalRef }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    return (
        <div>
            {children}
        </div>
    );
};

export default ModalComp;
