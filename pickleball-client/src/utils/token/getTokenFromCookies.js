import { globalConfig } from "@/config/globalConfig";

const getAccessTokenFromCookies = (cookies) => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(globalConfig.accessTokenField)?.value;
    return accessToken;
};

const getRefreshTokenFromCookies = (cookies) => {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(globalConfig.refreshTokenField)?.value;
    return refreshToken;
};

export {
    getAccessTokenFromCookies,
    getRefreshTokenFromCookies
};