import httpStatus from "http-status";
import { authServices, tokenServices, userServices, emailServices } from "../services/index.js";
import { catchAsync, tokenUtilities } from "../utils/index.js";
import getUserByGoogleAccessToken from "../utils/getUserByGoogleAccessToken.js";
import { tokenTypes } from "../../config/token.js";
import globalConfig from "../../config/globalConfig.js";
import getTokenFromHeaders from "../utils/token/getTokenFromHeaders.js";

const register = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    const tokens = await tokenServices.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.loginWithEmailAndPassword(email, password);
    const tokens = await tokenServices.generateAuthTokens(user);

    // set cookies
    const { accessToken, refreshToken } = tokens;
    tokenUtilities.setAccessTokenToCookies(res, accessToken);
    tokenUtilities.setRefreshTokenToCookies(res, refreshToken);
    res.send({ user });
});

const logout = catchAsync(async (req, res) => {
    await authServices.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const refreshTokenCookie = tokenUtilities.getRefreshTokenFromCookies(req);
    const tokens = await authServices.refreshAuth(refreshTokenCookie);

    // set cookies
    const { accessToken, refreshToken } = tokens;

    tokenUtilities.setAccessTokenToCookies(res, accessToken);
    tokenUtilities.setRefreshTokenToCookies(res, refreshToken);

    res.status(httpStatus.OK).send(tokens);
});

// const forgotPassword = catchAsync(async (req, res) => {
//     const resetPasswordToken = await tokenServices.generateResetPasswordToken(req.body.email);
//     await emailServices.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//     res.status(httpStatus.NO_CONTENT).send();
// });

const forgotPassword = catchAsync(async (req, res) => {
    const email = req.body.email;
    const verifyEmailToken = await tokenServices.generateResetPasswordToken(email);
    const user = await userServices.getUserByEmail(email);
    const response = await emailServices.sendVerificationEmail(user, verifyEmailToken, "reset-password");
    res.status(httpStatus.OK).send(response);
});

const changePassword = catchAsync(async (req, res) => {
    const accessToken = getTokenFromHeaders(req);
    await authServices.changePassword(accessToken, req.body.password);
    res.status(httpStatus.OK).send();
});

const resetPassword = catchAsync(async (req, res) => {
    await authServices.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    // const token = getTokenFromHeaders(req);
    const token = tokenUtilities.getAccessTokenFromCookies(req);
    const verifyToken = await tokenServices.verifyToken(token, tokenTypes.ACCESS);
    const userId = verifyToken.sub;
    const user = await userServices.getUserById(userId);
    const verifyEmailToken = await tokenServices.generateVerifyEmailToken(user.id);
    const response = await emailServices.sendVerificationEmail(user, verifyEmailToken, "verify-email");
    res.status(httpStatus.OK).send(response);
});

const verifyEmail = catchAsync(async (req, res) => {
    const response = await authServices.verifyEmail(req.query.token);
    if (response) {
        res.redirect(`${globalConfig.frontendDomain}/email-verified`);
    }
    // res.status(httpStatus.OK).send({response});
});

const loginWithGoogle = catchAsync(async (req, res) => {
    const googleAccessToken = req.body.token;
    const user = await getUserByGoogleAccessToken(googleAccessToken);
    const tokens = await tokenServices.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    changePassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    loginWithGoogle
};