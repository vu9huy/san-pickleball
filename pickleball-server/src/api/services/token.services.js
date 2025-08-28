import globalConfig from "../../config/globalConfig.js";
import { tokenTypes } from "../../config/token.js";
import { Token } from "../models/index.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import userServices from "./user.services.js";
import httpStatus from "http-status";
import ApiError from "../../config/errors/ApiError.js";
import errorData from "../../config/errors/errorData.js";

const generateToken = ({ userId, expires, type, secret = globalConfig.jwt.secret }) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};

const storeToken = async ({ token, userId, expires, type, blacklisted = false }) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted
    });
    return tokenDoc;
};

// Cần xem lại những chỗ dùng và so sánh với verifyAccessToken
const verifyToken = async (token, type) => {
    try {
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.MISSING_TOKEN);
        }
        const verify = jwt.verify(token, globalConfig.jwt.secret);
        // check token type
        const verifyType = verify.type;
        const checkType = verifyType === type;
        if (!checkType) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.INVALID_TOKEN_TYPE);
        }
        return verify;
    } catch (error) {
        console.log("verifyToken error", error);
        if (error.name === "TokenExpiredError") {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed " + type, errorData.TOKEN_EXPIRES);
        }
        throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed " + type, error.data);
    }
};

const generateAuthTokens = async (user) => {
    const userId = user.id;
    const accessTokenExpires = moment().add(globalConfig.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken({ userId, expires: accessTokenExpires, type: tokenTypes.ACCESS });
    const refreshTokenExpires = moment().add(globalConfig.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken({ userId, expires: refreshTokenExpires, type: tokenTypes.REFRESH });

    return {
        accessToken: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refreshToken: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};

const generateResetPasswordToken = async (email) => {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "No user found with this email");
    }
    const expires = moment().add(globalConfig.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = generateToken({ userId: user.id, expires, type: tokenTypes.RESET_PASSWORD });
    return resetPasswordToken;
};

const generateVerifyEmailToken = async (userId) => {
    const expires = moment().add(globalConfig.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = generateToken({ userId, expires, type: tokenTypes.VERIFY_EMAIL });
    return verifyEmailToken;
};

export default {
    generateToken,
    storeToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken
};