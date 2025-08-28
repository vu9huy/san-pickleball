import { useGetCourtsFetchingApi } from "@/api/serverApi/callApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import createQueryString from "@/utils/others/createQueryString";
import createQueryObject from "@/utils/others/createQueryObject";

const useGetCourts = () => {
    const searchParams = useSearchParams();

    const queryObj = createQueryObject(searchParams);
    const queryString = createQueryString(queryObj);

    const { data: response, isPending, isError, refetch: refetchGetCourts } = useGetCourtsFetchingApi(queryString);
    const data = response?.data;
    const totalPages = data?.totalPages;
    const totalCourts = data?.totalResults;
    const courtsRes = data?.results;
    
    for (let i = 0; i < courtsRes?.length; i++) {
        (courtsRes[i]).key = `court-${i}`;
    }

    const [courts, setCourts] = useState(courtsRes || null);

    useEffect(() => {
        setCourts(courtsRes || null);
    }, [courtsRes]);


    return {
        totalPages,
        totalCourts,
        courts,
        setCourts
    };
};

// const useGetCourts = (searchParams) => {

//     const queryObj = createQueryObject(searchParams);
//     const queryString = createQueryString(queryObj);

//     const { data: response, isPending, isError, refetch: refetchGetCourts } = useGetCourtsFetchingApi(queryString);
//     const data = response?.data;
//     const totalPages = data?.totalPages;
//     const totalCourts = data?.totalResults;
//     const courtsRes = data?.results;

//     for (let i = 0; i < courtsRes?.length; i++) {
//         (courtsRes[i]).key = `court-${i}`;
//     }

//     const [courts, setCourts] = useState(courtsRes || null);

//     useEffect(() => {
//         setCourts(courtsRes || null);
//     }, [courtsRes]);


//     return {
//         totalPages,
//         totalCourts,
//         courts,
//         setCourts
//     };
// };

export default useGetCourts;