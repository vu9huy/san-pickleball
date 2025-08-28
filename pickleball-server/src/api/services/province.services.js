import httpStatus from "http-status";
import { Court, Province } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createProvince = async (provinceData) => {
    return Province.create(provinceData);
};

const queryProvinces = async (filter, options) => {
    const provinces = await Province.queryAndPaginate(filter, options);
    return provinces;
};

const getAllProvinces = async () => {
    const provinces = await Province.find();
    return provinces;
};

const getProvinceById = async (id) => {
    checkIdType(id);
    const province = Province.findById(id);
    return province;
};

const editProvinceById = async (id, provinceData) => {
    const province = await getProvinceById(id);
    if (!province) {
        throw new ApiError(httpStatus.NOT_FOUND, "Province not found");
    }
    Object.assign(province, provinceData);
    await province.save();
    return province;
};


const softDeleteProvinceById = async (id) => {
    const province = await getProvinceById(id);
    if (!province) {
        throw new ApiError(httpStatus.NOT_FOUND, "Province not found");
    }
    // Soft delete
    Object.assign(province, { isDeleted: true });
    await province.save();
    return province;
};

const hardDeleteProvinceById = async (id) => {
    const province = await getProvinceById(id);
    if (!province) {
        throw new ApiError(httpStatus.NOT_FOUND, "Province not found");
    }
    await province.remove();
    return province;
};

const getTopProvinces = async (query) => {
    const { number } = query;
    console.log("number433434", number);

    const provinces = await Province.aggregate([
        { $sort: { numberOfCourts: -1 } },
        { $limit: Number(number) }
    ]);
    console.log("provinces4334", provinces);

    return provinces;
};

const updateCourtsCounter = async () => {
    const provinces = await Court.aggregate([
        { $group: { _id: "$location.province", numberOfCourts: { $sum: 1 } } },
        {
            $set: { value: "$_id" } // Rename `_id` to `value`
        },
        {
            $unset: "_id" // Remove the original `_id`
        },
        { $merge: { into: "provinces", on: "value", whenMatched: "merge" } }
    ]);
    return provinces;
};

export default {
    createProvince,
    queryProvinces,
    getAllProvinces,
    getProvinceById,
    editProvinceById,
    softDeleteProvinceById,
    hardDeleteProvinceById,
    updateCourtsCounter,
    getTopProvinces
};