import httpStatus from "http-status";
import { partnerLookingServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createPartnerLooking = catchAsync(async (req, res) => {
    const partnerLooking = await partnerLookingServices.createPartnerLooking(req.body);
    res.status(httpStatus.CREATED).send(partnerLooking);
});

const getPartnerLooking = catchAsync(async (req, res) => {
    const partnerLooking = await partnerLookingServices.getPartnerLookingById(req.params.partnerLookingId);
    const isDeleted = partnerLooking?.isDeleted;
    if (isDeleted || !partnerLooking) {
        throw new ApiError(httpStatus.NOT_FOUND, "PartnerLooking not found");
    }
    res.send(partnerLooking);
});

const getPartnerLookings = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name"]);
    const filter = filterObject.partnerLookingFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await partnerLookingServices.queryPartnerLookings(filter, options);
    res.send(result);
});

const updatePartnerLooking = catchAsync(async (req, res) => {
    const partnerLooking = await partnerLookingServices.updatePartnerLooking(req.params.partnerLookingId, req.body);
    res.send(partnerLooking);
});

const deletePartnerLooking = catchAsync(async (req, res) => {
    await partnerLookingServices.softDeletePartnerLookingById(req.params.partnerLookingId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createPartnerLooking,
    getPartnerLooking,
    getPartnerLookings,
    updatePartnerLooking,
    deletePartnerLooking
};