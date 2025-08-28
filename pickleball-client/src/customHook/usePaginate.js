import renderPagination from "@/utils/others/renderPagination";
import addQueryString from "@/utils/url/addQueryString";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const usePaginate = ({ totalPages }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageParam = Number(searchParams.get("page"));
    const checkedPageParam = pageParam > totalPages ? totalPages : pageParam;

    const initialPage = checkedPageParam || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        setCurrentPage(checkedPageParam || 1);
    }, [checkedPageParam]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        const addQueries = [{ name: "page", value: page }];
        const path = addQueryString({ pathname, searchParams, addQueries });
        router.push(path);
    };

    const pagination = renderPagination({ totalPages, currentPage }) || [];
    return {
        currentPage,
        pagination,
        handlePageChange
    };
};

export default usePaginate;