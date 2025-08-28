const renderPagination = ({ totalPages, currentPage }) => {
    const pages = [];
    if (totalPages <= 5) {
        // If totalPages is 5 or fewer, show all pages
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    } else {
        // Logic for more than 5 pages
        pages.push(1);
        if (totalPages > 1) pages.push(2);

        if (currentPage > 4) {
            pages.push("...");
        }
        const startPage = Math.max(3, currentPage - 1);
        const endPage = Math.min(totalPages - 2, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
            if (i > 2 && i < totalPages - 1) {
                pages.push(i);
            }
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        if (totalPages > 2) pages.push(totalPages - 1);
        if (totalPages > 1) pages.push(totalPages);
        return pages;
    }
};

export default renderPagination;