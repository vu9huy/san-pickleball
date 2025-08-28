import httpStatus from "http-status";
import ApiError from "../../../config/errors/ApiError.js";

const getTokenFromHeaders = (req) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Missing token");
    }
    return token;
};

export default getTokenFromHeaders;