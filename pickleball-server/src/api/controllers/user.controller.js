import httpStatus from "http-status";
import { userServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";

const createUser = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userServices.getUserById(req.params.userId);
    res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name", "role"]);
    const filter = filterObject.userFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await userServices.queryUsers(filter, options);
    res.send(result);
});

const getUserLocations = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["radius"]);
    const tokenUserId = res.locals.tokenUserId;
    const result = await userServices.getUserLocations({userId: tokenUserId, radius: queryData.radius});
    res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userServices.editUserById(req.params.userId, req.body);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userServices.softDeleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createUser,
    getUser,
    getUsers,
    getUserLocations,
    updateUser,
    deleteUser
};