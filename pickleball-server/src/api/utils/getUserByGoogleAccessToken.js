import httpStatus from "http-status";
import ApiError from "../../config/errors/ApiError.js";
import errorData from "../../config/errors/errorData.js";
import randomPassword from "./randomPassword.js";
import User from "../models/user.model.js";
import userServices from "../services/user.services.js";

const getUserByGoogleAccessToken = async (googleAccessToken) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`);
    const data = await response.json();
    if (data.error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization failed", errorData.INVALID_GOOGLE_ACCESS_TOKEN);
    }
    const checkExistUser = await User.isEmailTaken(data.email);
    // console.log("checkExistUser443", checkExistUser);
    let user = null;
    if (checkExistUser) {
        const existUser = await userServices.getUserByEmail(data.email);
        const newUser = { isVerifiedEmail: true };
        user = await userServices.editUserById(existUser.id, newUser);
    } else {
        const userData = {
            name: data.name,
            email: data.email,
            isVerifiedEmail: true,
            role: "user",
            password: randomPassword(),
            location: null,
        };
        user = await userServices.createUser(userData);
    }
    return user;
};

export default getUserByGoogleAccessToken;