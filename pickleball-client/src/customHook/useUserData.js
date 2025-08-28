import { useGetUserFetchingApi } from "@/api/serverApi/callApi";
import { getUserIdFromCookie } from "@/utils/userdata/userdataUtilities";

const useUserData = () => {
    let userData = null;
    const userId = getUserIdFromCookie();

    const { data: response, isPending, refetch } = useGetUserFetchingApi(userId);

    if (userId && response?.status == 200) {
        userData = response?.data || null;
    }
    
    return {
        userData,
        userDataLoading: isPending,
        userDataRefesh: refetch,
    }
}

export default useUserData;