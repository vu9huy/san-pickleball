// "use client";
// import React, { useState } from "react";
// import "./ImageModal.css"; // Custom CSS for modal styling

// const ImageModal = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const openModal = () => {
//         console.log("openModal");
//         setIsOpen(true);
//     };

//     const closeModal = (e) => {
//         if (e.target.className === "image-modal-overlay") {
//             setIsOpen(false);
//         }
//     };

//     const handleCloseButton = () => {
//         setIsOpen(false);
//     };

//     return (
//         <>
//             <div onClick={openModal} style={{ display: "inline-block", cursor: "pointer" }}>
//                 {children}
//             </div>

//             {isOpen && (
//                 <div className="image-modal-overlay" onClick={closeModal}>
//                     <div className="image-modal-content">
//                         {children}
//                     </div>
//                     <button 
//                         className="slide-close-button" 
//                         onClick={handleCloseButton}
//                         aria-label="Close modal"
//                     >
//                         ×
//                     </button>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ImageModal;


"use client";
import React, { useState } from "react";
import "./ImageModal.css"; // Custom CSS for modal styling

const ImageModal = ({ trigger, modalContent, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        console.log("openModal");
        setIsOpen(true);
    };

    const closeModal = (e) => {
        if (e.target.className === "image-modal-overlay") {
            setIsOpen(false);
        }
    };

    const handleCloseButton = () => {
        setIsOpen(false);
    };

    // Support both new prop-based approach and legacy children approach
    const triggerContent = trigger || children;
    const contentToShow = modalContent || children;

    return (
        <>
            <div onClick={openModal} style={{ display: "inline-block", cursor: "pointer" }}>
                {triggerContent}
            </div>

            {isOpen && (
                <div className="image-modal-overlay" onClick={closeModal}>
                    <div className="image-modal-content">
                        {contentToShow}
                    </div>
                    <button 
                        className="slide-close-button" 
                        onClick={handleCloseButton}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
};

export default ImageModal;