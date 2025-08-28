import { useGetGeoLocationCourtsFetchingApi } from "@/api/serverApi/callApi";
import createQueryObject from "@/utils/others/createQueryObject";
import createQueryString from "@/utils/others/createQueryString";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const INITIAL_COURTS_PER_REQUEST = 500;

const useGetCourtLocations = () => {
    const searchParams = useSearchParams();
    const queryObj = createQueryObject(searchParams);

    const queryObjNotLimit = { ...queryObj };
    delete queryObjNotLimit.limit;
    delete queryObjNotLimit.page;

    const [page, setPage] = useState(1);

    queryObj["limit"] = INITIAL_COURTS_PER_REQUEST;
    queryObj["page"] = page;
    const queryString = createQueryString(queryObj);
    const { data: response, isPending, isError, refetch: refetchGetCourts } = useGetGeoLocationCourtsFetchingApi(queryString);

    const [allCourts, setAllCourts] = useState([]);
    // const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        return () => {
            setPage(1);
            setAllCourts([]);
        };
    }, [JSON.stringify(queryObjNotLimit)]);

    useEffect(() => {
        if (/* !isFetching || */ (response?.data && page > response?.data?.totalPages)) return;
        const interval = setInterval(async () => {
            const { data: fetchedData } = await refetchGetCourts();

            if (fetchedData) {
                const data = fetchedData?.data;
                const courts = data?.results || [];
                setAllCourts((prevResults) => {
                    return [...prevResults, ...courts];
                });
                // clearInterval(interval);

                // Check if we've reached the last page
                if (page >= data.totalPages) {
                    // setIsFetching(false); // Stop fetching
                    clearInterval(interval);
                } else {
                    setPage((prevPage) => prevPage + 1); // Increment page
                }
            }
        }, 1000);

        return () => { clearInterval(interval); }; // Cleanup on unmount
    }, [page, JSON.stringify(queryObjNotLimit)]);


    for (let i = 0; i < allCourts?.length; i++) {
        (allCourts[i]).key = `court-${i}`;
    }

    return {
        allCourts
    };
};

export default useGetCourtLocations;