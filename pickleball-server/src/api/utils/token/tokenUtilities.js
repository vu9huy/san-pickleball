import globalConfig from "../../../config/globalConfig.js";
import { iso8601ToUnixTime } from "../time/iso8601ToUnixTime.js";

const getAccessTokenFromCookies = (req) => {
    const accessToken = req.cookies[globalConfig.token.accessTokenField];
    return accessToken;
};

const getRefreshTokenFromCookies = (req) => {
    const refreshToken = req.cookies[globalConfig.token.refreshTokenField];
    return refreshToken;
};

const setAccessTokenToCookies = (res, accessToken) => {
    res.cookie(globalConfig.token.accessTokenField, accessToken.token, {
        maxAge: iso8601ToUnixTime(accessToken.expires),
        httpOnly: true,
        secure: true,
        SameSite: "Strict"
    });
};

const setRefreshTokenToCookies = (res, refreshToken) => {
    res.cookie(globalConfig.token.refreshTokenField, refreshToken.token, {
        maxAge: iso8601ToUnixTime(refreshToken.expires),
        path: "/api/v1/auth/refresh-token",
        httpOnly: true,
        secure: true,
        SameSite: "Strict"
    });
};


export default {
    setAccessTokenToCookies,
    setRefreshTokenToCookies,
    getAccessTokenFromCookies,
    getRefreshTokenFromCookies
};