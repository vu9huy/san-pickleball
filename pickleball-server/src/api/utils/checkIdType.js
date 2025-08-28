import httpStatus from "http-status";
import ApiError from "../../config/errors/ApiError.js";

// Because mongoose pass id to ObjectId, if id not match type of ObjectId will throw error: Cast to ObjectId failed for value XXX at path "_id"
// https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
export const checkIdType = (id) => {
    if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(httpStatus.NOT_FOUND, "wrong id type");
    }
};