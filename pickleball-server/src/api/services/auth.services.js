import httpStatus from "http-status";
import userServices from "./user.services.js";
import tokenServices from "./token.services.js";
import { Token } from "../models/index.js";
import { tokenTypes } from "../../config/token.js";
import logger from "../../config/logger.js";
import ApiError from "../../config/errors/ApiError.js";


const loginWithEmailAndPassword = async (email, password) => {
    const user = await userServices.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    }
    return user;
};

const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await refreshToken.remove();
};

const refreshAuth = async (refreshTokenCookie) => {
    const verify = await tokenServices.verifyToken(refreshTokenCookie, tokenTypes.REFRESH);
    const userId = verify.sub;
    const user = await userServices.getUserById(userId);
    return tokenServices.generateAuthTokens(user);
};

const changePassword = async (accessToken, newPassword) => {
    const verify = await tokenServices.verifyToken(accessToken, tokenTypes.ACCESS);
    const userId = verify.sub;
    const user = await userServices.getUserById(userId);
    if (!user) {
        logger.error("changePassword error");
        throw new ApiError(httpStatus.UNAUTHORIZED, "Change password failed");
    }
    await userServices.editUserById(userId, { password: newPassword });
};

const resetPassword = async (resetPasswordToken, newPassword) => {
    const verify = await tokenServices.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const userId = verify.sub;
    const user = await userServices.getUserById(userId);
    if (!user) {
        logger.error("resetPassword error");
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
    }
    await userServices.editUserById(user.id, { password: newPassword });
};

const verifyEmail = async (verifyEmailToken) => {
    const verify = await tokenServices.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const userId = verify.sub;
    const user = await userServices.getUserById(userId);
    if (!user) {
        logger.error("verifyEmail error");
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
    }
    // if (user.isVerifiedEmail) {
    //     return user;
    // }
    await userServices.editUserById(user.id, { isVerifiedEmail: true });
    return user;
};

export default {
    loginWithEmailAndPassword,
    logout,
    refreshAuth,
    changePassword,
    resetPassword,
    verifyEmail
};
