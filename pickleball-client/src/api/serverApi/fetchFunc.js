import { deleteMethod, getMethod, patchMethod, postMethod } from "./fetchMethod";

const headers = {
    "Content-Type": "application/json"
};

// COURT FETCHING
const getCourtsFetchingFunc = async (queryString) => {
    const url = `/courts?${queryString}`;
    const response = await getMethod(url, headers);
    return response;
};

const getGeoLocationCourtsFetchingFunc = async (queryString) => {
    const url = `/courts/geo-location?${queryString}`;
    const response = await getMethod(url, headers);
    return response;
};

const getCourtBySlugFetchingFunc = async (courtSlug) => {
    const url = `/courts/${courtSlug}`;
    const response = await getMethod(url, headers);
    return response;
};

const getCourtByListIdFetchingFunc = async (listCourtId) => {
    const listIdString = listCourtId.join(",") || "";
    const url = `/courts?list=${listIdString}`;
    const response = await getMethod(url, headers);
    return response;
};

const getCourtByOwnerIdFetchingFunc = async (ownerId, page) => {
    const queryString = `owner[id]=${ownerId}&page=${page}`;
    const url = `/courts?${queryString}`;
    const response = await getMethod(url, headers);
    return response;
};

const createCourtFunc = async ({ courtData }) => {
    const url = "/courts";
    const body = JSON.stringify(courtData);
    const response = await postMethod(url, body, headers);
    return response;
};

const editCourtFunc = async ({ courtId, courtData }) => {
    const url = `/courts/${courtId}`;
    const body = JSON.stringify(courtData);
    const response = await patchMethod(url, body, headers);
    return response;
};

const uploadImagesFetchingFunc = async (formData) => {
    const url = "/cloudinary/upload-images";
    const body = formData;
    const response = await postMethod(url, body, headers);
    return response;
};

// PROVINCES FETCHING
const getTopProvincesFunc = async () => {
    const url = "/provinces/top?number=5";
    const response = await getMethod(url, headers);
    return response;
}

// GOOGLE PLACE FETCHING
const getGooglePlaceByPlaceIdFetchingFunc = async (placeId) => {
    const url = `/google-place/${placeId}`;
    const response = await getMethod(url, headers);
    return response;
}

// BOOKING FETCHING
const getBookingByCourtIdFetchingFunc = async (courtId, bookingDate) => {
    const url = `/bookings?court[id]=${courtId}&bookingInfo[date]=${bookingDate}`;
    const response = await getMethod(url, headers);
    return response;
};

const getBookingByDateTimeFetchingFunc = async (queryString) => {
    const url = `/bookings?${queryString}`;
    const response = await getMethod(url, headers);
    return response;
};

const createBookingFunc = async ({ bookingData }) => {
    const url = "/bookings";
    const body = JSON.stringify(bookingData);
    const response = await postMethod(url, body, headers);
    return response;
};

const editBookingFunc = async ({ bookingId, bookingData }) => {
    const url = `/bookings/${bookingId}`;
    const body = JSON.stringify(bookingData);
    const response = await patchMethod(url, body, headers);
    return response;
};

const deleteBookingFunc = async ({ bookingId }) => {
    const url = `/bookings/${bookingId}`;
    const response = await deleteMethod(url, headers);
    return response;
};

// AUTH FETCHING
const registerFetchingFunc = async (data) => {
    const url = "/auth/register";
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};

const loginFetchingFunc = async (data) => {
    const url = "/auth/login";
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};

const refreshTokenFetchingFunc = async () => {
    const url = "auth/refresh-token";
    const data = {};
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};

const googleloginFetchingFunc = async (token) => {
    const url = "/auth/google-login";
    const data = { token };
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};

const verifyEmailFetchingFunc = async () => {
    const url = "auth/send-verification-email";
    const data = {};
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};

const changePasswordFetchingFunc = async (password) => {
    const url = "/auth/change-password";
    const data = { password: password };
    const body = JSON.stringify(data);
    const response = await postMethod(url, body, headers);
    return response;
};


// USER FETCHING
const getUserFetchingFunc = async (userId) => {
    const url = `/users/${userId}`;
    const response = await getMethod(url);
    return response;
};

const editUserFunc = async ({ userId, userData }) => {
    const url = `/users/${userId}`;
    const body = JSON.stringify(userData);
    const response = await patchMethod(url, body, headers);
    return response;
};

const getUserLocations = async (userId, radius) => {
    const url = `/users/locations?radius=${radius}`;
    const response = await getMethod(url);
    return response;
};


export {
    // Court
    getCourtsFetchingFunc,
    getGeoLocationCourtsFetchingFunc,
    getCourtByOwnerIdFetchingFunc,
    getCourtBySlugFetchingFunc,
    getCourtByListIdFetchingFunc,
    createCourtFunc,
    editCourtFunc,

    // Provinces
    getTopProvincesFunc,

    // Google place
    getGooglePlaceByPlaceIdFetchingFunc,

    // Booking
    getBookingByCourtIdFetchingFunc,
    getBookingByDateTimeFetchingFunc,
    createBookingFunc,
    editBookingFunc,
    deleteBookingFunc,

    // Image
    uploadImagesFetchingFunc,

    // User
    getUserFetchingFunc,
    editUserFunc,
    getUserLocations,

    // Auth
    registerFetchingFunc,
    loginFetchingFunc,
    refreshTokenFetchingFunc,
    googleloginFetchingFunc,
    verifyEmailFetchingFunc,
    changePasswordFetchingFunc
};