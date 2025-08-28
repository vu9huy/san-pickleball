import httpStatus from "http-status";
import { GooglePlace } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createGooglePlace = async (googlePlaceData) => {
    return GooglePlace.create(googlePlaceData);
};

const queryGooglePlaces = async (filter, options) => {
    const googlePlaces = await GooglePlace.queryAndPaginate(filter, options);
    return googlePlaces;
};

const getAllGooglePlaces = async () => {
    const googlePlaces = await GooglePlace.find();
    return googlePlaces;
};

const getGooglePlaceByPlaceId = async (id) => {
    const googlePlace = GooglePlace.findOne({ place_id: id });
    if (!googlePlace) {
        throw new ApiError(httpStatus.NOT_FOUND, "GooglePlace not found");
    }
    return googlePlace;
};

const getGooglePlaceById = async (id) => {
    checkIdType(id);
    const googlePlace = GooglePlace.findById(id);
    if (!googlePlace) {
        throw new ApiError(httpStatus.NOT_FOUND, "GooglePlace not found");
    }
    return googlePlace;
};

const editGooglePlaceById = async (id, googlePlaceData) => {
    const googlePlace = await getGooglePlaceById(id);
    Object.assign(googlePlace, googlePlaceData);
    await googlePlace.save();
    return googlePlace;
};


const softDeleteGooglePlaceById = async (id) => {
    const googlePlace = await getGooglePlaceById(id);
    // Soft delete
    Object.assign(googlePlace, { isDeleted: true });
    await googlePlace.save();
    return googlePlace;
};

const hardDeleteGooglePlaceById = async (id) => {
    const googlePlace = await getGooglePlaceById(id);
    await googlePlace.remove();
    return googlePlace;
};

export default {
    createGooglePlace,
    queryGooglePlaces,
    getAllGooglePlaces,
    getGooglePlaceById,
    getGooglePlaceByPlaceId,
    editGooglePlaceById,
    softDeleteGooglePlaceById,
    hardDeleteGooglePlaceById
};