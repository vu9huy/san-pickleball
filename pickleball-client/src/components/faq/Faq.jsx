"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

const Faq = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className={styles["faq-container"]}>
            <div className={styles["faq-list"]}>
                <h2 className="faq-label">
                    Câu hỏi thường gặp
                </h2>
                {faqs.map((faq, index) => (
                    <div key={index} className={styles["faq-item"]}>
                        <div className={styles["faq-question"]} onClick={() => toggleFAQ(index)}>
                            <span>{faq.question}</span>
                            <span className={`${styles["arrow"]} ${styles[activeIndex === index ? "open" : ""]}`}>&#9662;</span>
                        </div>
                        <div className={`${styles["faq-answer"]} ${styles[activeIndex === index ? "open" : ""]}`}>{faq.answer}</div>
                        {/* {activeIndex === index && <div className={`${styles["faq-answer"]} ${styles[activeIndex === index ? "open" : ""]}`}>{faq.answer}</div>} */}
                    </div>
                ))}
            </div>
        </div>

    );

};

export default Faq;