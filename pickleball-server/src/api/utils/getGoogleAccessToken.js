import httpStatus from "http-status";
import ApiError from "../../config/errors/ApiError.js";
import globalConfig from "../../config/globalConfig.js";
import logger from "../../config/logger.js";
import qs from "qs";

const getGoogleAccessToken = async () => {
    const url = "https://oauth2.googleapis.com/token";
    const data = {
        client_id: globalConfig.google.oauthClientId,
        client_secret: globalConfig.google.oauthClientSecret,
        refresh_token: globalConfig.google.oauthRefreshToken,
        grant_type: "refresh_token"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify(data)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error);
        }

        return result.access_token;
    } catch (error) {
        logger.error("getGoogleAccessToken", error.message);
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
};

export default getGoogleAccessToken;