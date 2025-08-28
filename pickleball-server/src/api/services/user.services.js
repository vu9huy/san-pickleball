import httpStatus from "http-status";
import { User } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import globalConfig from "../../config/globalConfig.js";
import ApiError from "../../config/errors/ApiError.js";


const createUser = async (userData) => {
    if (userData.role === "owner" && userData.code !== globalConfig.ownerCode) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Wrong owner code");
    }
    const checkEmailTaken = await User.isEmailTaken(userData.email);
    if (checkEmailTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return User.create(userData);
};


const queryUsers = async (filter, options) => {
    const users = await User.queryAndPaginate(filter, options);
    return users;
};

const getUserById = async (id) => {
    checkIdType(id);
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const getUserLocations = async ({userId, radius}) => {
    const userData = await User.findById(userId)
    const lon = userData.location.coordinates[0];
    const lat = userData.location.coordinates[1];
    const users = await User.find(
        {
            "location.isShowLocation": { $ne: false },
            "location.coordinates": {
                $geoWithin: {
                    $centerSphere: [[lon, lat], parseInt(radius) / 6378.1]
                }
            }
        },
        { name: 1, "images.avatar": 1, location: 1, contact: 1, level: 1, status: 1, _id: 1 }
    );
    return users;
}

const editUserById = async (id, userData) => {
    const user = await getUserById(id);
    if (userData.email && (await User.isEmailTaken(userData.email, id))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    Object.assign(user, userData);
    await user.save();
    return user;
};


const softDeleteUserById = async (id) => {
    const user = await getUserById(id);
    // Soft delete
    Object.assign(user, { isDeleted: true });
    await user.save();
    return user;
};

const hardDeleteUserById = async (id) => {
    const user = await getUserById(id);
    await user.remove();
    return user;
};


export default {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    getUserLocations,
    editUserById,
    softDeleteUserById,
    hardDeleteUserById
};