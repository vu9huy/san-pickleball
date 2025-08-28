import httpStatus from "http-status";
import ApiError from "../../config/errors/ApiError.js";
import errorData from "../../config/errors/errorData.js";
import { userServices, courtServices, tokenServices, bookingServices } from "../services/index.js";
import checkPermission from "../utils/checkPermission.js";
// import jwt from "jsonwebtoken";
import { tokenTypes } from "../../config/token.js";
import { catchAsync, tokenUtilities } from "../utils/index.js";
import globalConfig from "../../config/globalConfig.js";

const checkRole = (permission) => {
    return async function (req, res, next) {
        try {
            const tokenUserId = res.locals.tokenUserId; // Ensure this is set somewhere before this middleware
            const user = await userServices.getUserById(tokenUserId);
            const userRole = user.role;
            const checkPermissionResult = checkPermission(userRole, permission);
            if (!checkPermissionResult) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_1);
            }

            // KHÁC KHÁC KHÁC
            const userId = req.params.userId;


            if (userId !== tokenUserId && userRole !== "admin") {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_2);
            }
            // KHÁC KHÁC KHÁC
            next();
        } catch (error) {
            next(error);
        }
    };
};

const checkCourtPermission = (permission) => {
    return async function (req, res, next) {
        try {
            const tokenUserId = res.locals.tokenUserId; // Ensure this is set somewhere before this middleware
            const user = await userServices.getUserById(tokenUserId);
            const userRole = user.role;
            const checkPermissionResult = checkPermission(userRole, permission);
            if (!checkPermissionResult) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_1);
            }

            // if (userRole !== "admin") {
            //     throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_2);
            // }
            next();
        } catch (error) {
            next(error);
        }
    };
};

const checkBlogPermission = (permission) => {
    return async function (req, res, next) {
        try {
            const tokenUserId = res.locals.tokenUserId; // Ensure this is set somewhere before this middleware
            const user = await userServices.getUserById(tokenUserId);
            const userRole = user.role;
            const checkPermissionResult = checkPermission(userRole, permission);
            if (!checkPermissionResult) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_1);
            }

            // KHÁC KHÁC KHÁC
            const userId = req.params.userId;


            if (userId !== tokenUserId && userRole !== "admin") {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_2);
            }
            // KHÁC KHÁC KHÁC
            next();
        } catch (error) {
            next(error);
        }
    };
};

const verifyAccessToken = async (req, res, next) => {
    try {
        const accessTokenCookie = tokenUtilities.getAccessTokenFromCookies(req);
        const decoded = await tokenServices.verifyToken(accessTokenCookie, tokenTypes.ACCESS);
        const tokenUserId = decoded.sub;
        res.locals.tokenUserId = tokenUserId;
        next();
    } catch (error) {
        next(error);
    }
};

const checkCreateBookingPermission = (permission) => {
    return async function (req, res, next) {
        try {
            const tokenUserId = res.locals.tokenUserId; // Ensure this is set somewhere before this middleware
            const user = await userServices.getUserById(tokenUserId);
            const userRole = user.role;
            const checkPermissionResult = checkPermission(userRole, permission);
            if (!checkPermissionResult) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_1);
            }

            // KHÁC KHÁC KHÁC
            const verifyEmail = user.isVerifiedEmail;


            if (!verifyEmail && userRole !== "admin") {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_2);
            }
            // KHÁC KHÁC KHÁC
            next();
        } catch (error) {
            next(error);
        }
    };
};

const checkEditBookingPermission = (permission) => {
    return async function (req, res, next) {
        try {
            const tokenUserId = res.locals.tokenUserId; // Ensure this is set somewhere before this middleware
            const user = await userServices.getUserById(tokenUserId);
            const userRole = user.role;
            const checkPermissionResult = checkPermission(userRole, permission);
            if (!checkPermissionResult) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_1);
            }

            // KHÁC KHÁC KHÁC
            const bookingId = req.params.bookingId;
            const booking = await bookingServices.getBookingById(bookingId);
            const courtId = booking.court.id;
            const court = await courtServices.getCourtById(courtId?.toString());
            const ownerId = court.owner.id;

            if (ownerId !== tokenUserId && userRole !== "admin") {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.ACCESS_DENIED_2);
            }
            // KHÁC KHÁC KHÁC
            next();
        } catch (error) {
            next(error);
        }
    };
};

export {
    verifyAccessToken,
    checkRole,
    checkCourtPermission,
    checkBlogPermission,
    checkCreateBookingPermission,
    checkEditBookingPermission
};