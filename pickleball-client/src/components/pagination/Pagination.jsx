"use client";

import styles from "./Pagination.module.css";
import usePaginate from "@/customHook/usePaginate";

const Pagination = ({ totalPages, loading }) => {
    const { currentPage, pagination, handlePageChange } = usePaginate({ totalPages });
    return (
        <>
            {loading || !totalPages || totalPages === 1 ?
                null :
                <div className={styles["pagination-container"]}>
                    {/* Previous Button */}
                    <button
                        className={`${styles["pagination-btn"]} ${styles["pagination-btn-text"]}`}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {"<"}
                    </button>

                    {/* Page Numbers */}
                    {pagination.map((page, index) => (
                        <div key={index}>
                            {page === "..." ? (
                                <span className={styles["pagination-ellipsis"]}>...</span>
                            ) : (
                                <button
                                    className={`${styles["pagination-btn"]} ${styles[page === currentPage ? "active" : ""]}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Next Button */}
                    <button
                        className={`${styles["pagination-btn"]} ${styles["pagination-btn-text"]}`}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {">"}
                    </button>
                </div>
            }</>

    );
};
export default Pagination;