import httpStatus from "http-status";
import { googlePlaceServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createGooglePlace = catchAsync(async (req, res) => {
    const googlePlace = await googlePlaceServices.createGooglePlace(req.body);
    res.status(httpStatus.CREATED).send(googlePlace);
});

const getGooglePlace = catchAsync(async (req, res) => {
    const googlePlace = await googlePlaceServices.getGooglePlaceByPlaceId(req.params.placeId);
    if (!googlePlace) {
        throw new ApiError(httpStatus.NOT_FOUND, "GooglePlace not found");
    }
    res.send(googlePlace);
});

const getGooglePlaces = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["court", "googlePlaceInfo"]);
    // if (!queryData?.court?.id) {
    //     console.log("43434343");
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Missing court id");
    // }
    const filter = filterObject.googlePlaceFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await googlePlaceServices.queryGooglePlaces(filter, options);
    res.send(result);
});

const updateGooglePlace = catchAsync(async (req, res) => {
    const googlePlace = await googlePlaceServices.editGooglePlaceById(req.params.googlePlaceId, req.body);
    res.send(googlePlace);
});

const deleteGooglePlace = catchAsync(async (req, res) => {
    await googlePlaceServices.softDeleteGooglePlaceById(req.params.googlePlaceId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createGooglePlace,
    getGooglePlace,
    getGooglePlaces,
    updateGooglePlace,
    deleteGooglePlace
};