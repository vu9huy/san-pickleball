import { globalConfig } from "@/config/globalConfig";
import { getCookie, setCookie, deleteCookie } from "cookies-next";


const setUserIdToCookie = (userData) => {
    if (typeof window !== "undefined") {
        // localStorage.setItem(globalConfig.userDataField, userData.id);
        setCookie(globalConfig.userDataField, userData?.id, { maxAge: Number(globalConfig.refreshTokenExpriesDay) * 24 * 60 * 60 });
    }
};

const getUserIdFromCookie = () => {
    if (typeof window !== "undefined") {
        // const userId = localStorage.getItem(globalConfig.userDataField);
        const userId = getCookie(globalConfig.userDataField);
        return userId;
    }
};

const removeUserIdFromCookie = () => {
    if (typeof window !== "undefined") {
        // localStorage.removeItem(globalConfig.userDataField);
        deleteCookie(globalConfig.userDataField);
    }
};

export {
    setUserIdToCookie,
    getUserIdFromCookie,
    removeUserIdFromCookie
};