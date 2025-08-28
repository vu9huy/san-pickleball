import httpStatus from "http-status";
import { PartnerLooking } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createPartnerLooking = async (partnerLookingData) => {
    return PartnerLooking.create(partnerLookingData);
};

const queryPartnerLookings = async (filter, options) => {
    const partnerLookings = await PartnerLooking.queryAndPaginate(filter, options);
    return partnerLookings;
};

const getAllPartnerLookings = async () => {
    const partnerLookings = await PartnerLooking.find();
    return partnerLookings;
};

const getPartnerLookingById = async (id) => {
    checkIdType(id);
    const partnerLooking = PartnerLooking.findById(id);
    if (!partnerLooking) {
        throw new ApiError(httpStatus.NOT_FOUND, "PartnerLooking not found");
    }
    return partnerLooking;
};

const editPartnerLookingById = async (id, partnerLookingData) => {
    const partnerLooking = await getPartnerLookingById(id);
    Object.assign(partnerLooking, partnerLookingData);
    await partnerLooking.save();
    return partnerLooking;
};


const softDeletePartnerLookingById = async (id) => {
    const partnerLooking = await getPartnerLookingById(id);
    // Soft delete
    Object.assign(partnerLooking, { isDeleted: true });
    await partnerLooking.save();
    return partnerLooking;
};

const hardDeletePartnerLookingById = async (id) => {
    const partnerLooking = await getPartnerLookingById(id);
    await partnerLooking.remove();
    return partnerLooking;
};

export default {
    createPartnerLooking,
    queryPartnerLookings,
    getAllPartnerLookings,
    getPartnerLookingById,
    editPartnerLookingById,
    softDeletePartnerLookingById,
    hardDeletePartnerLookingById
};