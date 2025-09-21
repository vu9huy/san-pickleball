import {
    changePasswordFetchingFunc,
    getCourtBySlugFetchingFunc,
    getCourtByListIdFetchingFunc,
    getCourtByOwnerIdFetchingFunc,
    getBookingByCourtIdFetchingFunc,
    getUserFetchingFunc,
    googleloginFetchingFunc,
    loginFetchingFunc,
    refreshTokenFetchingFunc,
    registerFetchingFunc,
    uploadImagesFetchingFunc,
    createCourtFunc,
    getCourtsFetchingFunc,
    editCourtFunc,
    createBookingFunc,
    editBookingFunc,
    deleteBookingFunc,
    getBookingByDateTimeFetchingFunc,
    verifyEmailFetchingFunc,
    getGeoLocationCourtsFetchingFunc,
    getGooglePlaceByPlaceIdFetchingFunc,
    getTopProvincesFunc,
    editUserFunc,
    getUserLocations,
    getAllProvincesFunc
} from "./fetchFunc";
import { useQueryWrapper, useMutationWrapper } from "./reactQueryWapper";

// COURT API
const useGetCourtsFetchingApi = (queryString) => {
    const response = useQueryWrapper([`get-courts-${queryString}`], () => getCourtsFetchingFunc(queryString));
    return response;
};

const useGetGeoLocationCourtsFetchingApi = (queryString) => {
    const response = useQueryWrapper([`get-geo-location-courts-${queryString}`], () => getGeoLocationCourtsFetchingFunc(queryString), { enabled: false });
    return response;
};

const useGetCourtBySlugFetchingApi = (courtSlug) => {
    const response = useQueryWrapper([`get-court-by-slug-${courtSlug}`], () => getCourtBySlugFetchingFunc(courtSlug));
    return response;
};

const useGetCourtByListIdFetchingApi = (listCourtId) => {
    const response = useQueryWrapper([`get-court-by-list-id-${listCourtId.join("-")}`], () => getCourtByListIdFetchingFunc(listCourtId)/* , {staleTime: 0} */);
    return response;
};

const useGetCourtByOwnerIdFetchingApi = (ownerId, page) => {
    const response = useQueryWrapper([`get-court-by-owner-id-${ownerId}-${page}`], () => getCourtByOwnerIdFetchingFunc(ownerId, page)/* , {staleTime: 0} */);
    return response;
};

const useCreateCourtFetchingApi = () => {
    const response = useMutationWrapper(createCourtFunc);
    return response;
};

const useEditCourtByIdFetchingApi = () => {
    const response = useMutationWrapper(editCourtFunc);
    return response;
};

const useUploadImagesFetchingApi = () => {
    const response = useMutationWrapper(uploadImagesFetchingFunc);
    return response;
};

// PROVINCES
const useGetAllProvincesFetchingApi = () => {
    const response = useQueryWrapper(['get-all-provinces'], () => getAllProvincesFunc());
    return response;
}

const useGetTopProvincesFetchingApi = () => {
    const response = useQueryWrapper(['get-top-provinces'], () => getTopProvincesFunc());
    return response;
}

// GOOGLE PLACE API
const useGetGooglePlaceByPlaceFetchingId = (placeId) => {
    const response = useQueryWrapper([`get-google-place-by-placeid-${placeId}`], () => getGooglePlaceByPlaceIdFetchingFunc(placeId));
    return response;
}

// BOOKING API
const useGetBookingByCourtIdFetchingApi = (courtId, bookingDate) => {
    const response = useQueryWrapper([`get-booking-by-courtid-${courtId}-${bookingDate}`], () => getBookingByCourtIdFetchingFunc(courtId, bookingDate) /* , { staleTime: 0 } */);
    return response;
};

const useGetBookingByDateTimeFetchingApi = (queryString) => {
    const response = useQueryWrapper([`get-booking-by-datetime-${queryString}`], () => getBookingByDateTimeFetchingFunc(queryString));
    return response;
};

const useCreateBookingFetchingApi = () => {
    const response = useMutationWrapper(createBookingFunc);
    return response;
};

const useEditBookingByIdFetchingApi = () => {
    const response = useMutationWrapper(editBookingFunc);
    return response;
};

const useDeleteBookingByIdFetchingApi = () => {
    const response = useMutationWrapper(deleteBookingFunc);
    return response;
};

// AUTH API
const useRegisterFetchingApi = () => {
    const response = useMutationWrapper(registerFetchingFunc);
    return response;
};

const useLoginFetchingApi = () => {
    const response = useMutationWrapper(loginFetchingFunc);
    return response;
};

const useRefreshTokenFetchingApi = () => {
    const response = useMutationWrapper(refreshTokenFetchingFunc);
    return response;
};

const useGoogleLoginFetchingApi = () => {
    const response = useMutationWrapper(googleloginFetchingFunc);
    return response;
};

const useVerifyEmailFetchingApi = () => {
    const response = useMutationWrapper(verifyEmailFetchingFunc);
    return response;
};

const useChangePasswordFetchingApi = () => {
    const response = useMutationWrapper(changePasswordFetchingFunc);
    return response;
};

// USER API
const useGetUserFetchingApi = (userId) => {
    const response = useQueryWrapper([`get-user-by-id-${userId}`], () => getUserFetchingFunc(userId), { enabled: !!userId });
    return response;
};

const useEditUserByIdFetchingApi = () => {
    const response = useMutationWrapper(editUserFunc);
    return response;
};

const useGetUserLocationsFetchingApi = (userData, radius) => {
    const userId = userData?.id;
    const userLocation = userData?.location?.coordinates && userData?.location?.coordinates[0] && userData?.location?.coordinates[1];
    const response = useQueryWrapper([`get-user-locations-${userId}-${radius}`], () => getUserLocations(userId, radius), { enabled: !!userLocation });
    return response;
}


export {
    // Court
    useGetCourtsFetchingApi,
    useGetGeoLocationCourtsFetchingApi,
    useGetCourtByOwnerIdFetchingApi,
    useGetCourtBySlugFetchingApi,
    useGetCourtByListIdFetchingApi,
    useCreateCourtFetchingApi,
    useEditCourtByIdFetchingApi,

    // Provinces
    useGetAllProvincesFetchingApi,
    useGetTopProvincesFetchingApi,

    // Google place
    useGetGooglePlaceByPlaceFetchingId,

    // Booking
    useGetBookingByCourtIdFetchingApi,
    useGetBookingByDateTimeFetchingApi,
    useCreateBookingFetchingApi,
    useEditBookingByIdFetchingApi,
    useDeleteBookingByIdFetchingApi,

    // Image
    useUploadImagesFetchingApi,

    // User
    useGetUserFetchingApi,
    useEditUserByIdFetchingApi,
    useGetUserLocationsFetchingApi,

    // Auth
    useRegisterFetchingApi,
    useLoginFetchingApi,
    useRefreshTokenFetchingApi,
    useGoogleLoginFetchingApi,
    useVerifyEmailFetchingApi,
    useChangePasswordFetchingApi

};