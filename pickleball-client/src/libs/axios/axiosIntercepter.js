import { globalConfig } from "@/config/globalConfig";
import axios from "axios";
import { refreshTokenFetchingFunc } from "../../api/serverApi/fetchFunc";

const axiosServerInstance = axios.create({
    baseURL: globalConfig.baseApiUrl,
    withCredentials: true
});

axiosServerInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        // console.error("axiosServerInstance request error", error);
        return Promise.reject(error);
    }
);

axiosServerInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // console.log("error", error);
        if (!originalRequest._retry && error.response && error.response.status === 401 && error?.response?.data?.data?.detail === "TOKEN_EXPIRES") {
            console.log("TOKEN_EXPIRES");
            originalRequest._retry = true;

            try {
                const response = await refreshTokenFetchingFunc();
                // console.log("response433434", response);
                
                return axiosServerInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                // deleteBothToken()
                return refreshError.response;
                // return Promise.reject(refreshError);
            }
        }
        // console.error("axiosServerInstance response error status", error.response.status);
        // console.error("axiosServerInstance response error data", error.response.data);
        return error.response;
        // return Promise.reject(error);
    }
);

export default axiosServerInstance;