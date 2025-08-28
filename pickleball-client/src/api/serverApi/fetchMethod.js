import axiosServerInstance from "../../libs/axios/axiosIntercepter";

const getMethod = async (url, headers = {}) => {
    try {
        const response = await axiosServerInstance.get(url, { headers: headers });
        return response;
    } catch (error) {
        console.log("getMethod error", error);
        return error;
    }
};

const postMethod = async (url, body, headers = {}) => {
    try {
        const response = await axiosServerInstance.post(url, body, { headers: headers });
        return response;
    } catch (error) {
        console.error("postMethod error", error);
        return error;
    }
};

const patchMethod = async (url, body, headers = {}) => {
    try {
        const response = await axiosServerInstance.patch(url, body, { headers: headers });
        return response;
    } catch (error) {
        console.error("patchMethod error", error);
        return error;
    }
};

const deleteMethod = async (url, headers = {}) => {
    try {
        const response = await axiosServerInstance.delete(url, { headers: headers });
        return response;
    } catch (error) {
        console.error("deleteMethod error", error);
        return error;
    }
};

export {
    getMethod,
    postMethod,
    patchMethod,
    deleteMethod
};