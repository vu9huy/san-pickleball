import { useGetUserLocationsFetchingApi } from "@/api/serverApi/callApi";


const useGetUserLocations = (userData, radius) => {
    const { data: response, isPending, isError, refetch: refetchGetUserLocations } = useGetUserLocationsFetchingApi(userData, radius);
    const users = response?.data;
    return {
        users
    }
};

export default useGetUserLocations;
