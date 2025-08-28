import { useGetCourtsFetchingApi } from "@/api/serverApi/callApi";
import createQueryObject from "@/utils/others/createQueryObject";
import createQueryString from "@/utils/others/createQueryString";


const useGetCourtsByProvince = ({ provinceSlug }) => {
    const searchParams = new URLSearchParams(`provinces=${provinceSlug}`);
    const queryObj = createQueryObject(searchParams);
    const queryString = createQueryString(queryObj);

    const { data: response, isPending, isError, refetch: refetchGetCourts } = useGetCourtsFetchingApi(queryString);
    const data = response?.data;

    const totalPages = data?.totalPages;
    const totalCourts = data?.totalResults;
    const courtsRes = data?.results;

}

export default useGetCourtsByProvince;