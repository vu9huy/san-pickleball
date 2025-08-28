import mongoose from "mongoose";
import httpStatus from "http-status";
import globalConfig from "../../config/globalConfig.js";
import logger from "../../config/logger.js";
import ApiError from "../../config/errors/ApiError.js";
// import globalConfig from "@/config/config.js";
// import logger from "@/config/logger.js";

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};
const errorHandler = (err, req, res, next) => {
    let { statusCode, message, data } = err;
    if (globalConfig.env === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        data,
        // Chỉ trả về stack ở môi trường development, không trả về ở production để tránh lộ thông tin
        ...(globalConfig.env === "development" && { stack: err.stack })
    };

    if (globalConfig.env === "development") {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export {
    errorConverter,
    errorHandler
};
