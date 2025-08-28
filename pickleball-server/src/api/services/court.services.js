import httpStatus from "http-status";
import { Court } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";
import getGoogleAnalyticsData from "../utils/googleAnalytics/getGoogleAnalyticsData.js";

const createCourt = async (courtData) => {
    return Court.create(courtData);
};


/**
 * Query for courts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCourts = async (filter, options, fields) => {
    const courts = await Court.queryAndPaginate(filter, options, fields);
    return courts;
};

const getAllCourts = async () => {
    const courts = await Court.find();
    return courts;
};

const getCourtById = async (id) => {
    checkIdType(id);
    const court = await Court.findById(id);
    if (!court) {
        throw new ApiError(httpStatus.NOT_FOUND, "Court not found");
    }
    return court;
};

const getCourtBySlug = async (slug) => {
    // await getGoogleAnalyticsData();
    const court = await Court.findOne({ slug: slug });
    if (!court) {
        throw new ApiError(httpStatus.NOT_FOUND, "Court not found");
    }
    return court;
};

const editCourtById = async (id, courtData) => {
    const court = await getCourtById(id);
    Object.assign(court, courtData);
    await court.save();
    return court;
};


const softDeleteCourtById = async (id) => {
    const court = await getCourtById(id);
    // Soft delete
    Object.assign(court, { isDeleted: true });
    await court.save();
    return court;
};

const hardDeleteCourtById = async (id) => {
    const court = await getCourtById(id);
    await court.remove();
    return court;
};

const counterView = async (id) => {
    const court = await getCourtById(id);
    const currentViews = court?.views || 0;
    Object.assign(court, { views: currentViews + 1 });
    await court.save();
    return court;
};

export default {
    createCourt,
    queryCourts,
    getAllCourts,
    getCourtById,
    getCourtBySlug,
    editCourtById,
    softDeleteCourtById,
    hardDeleteCourtById,
    counterView
};