import httpStatus from "http-status";
import { courtServices, provinceServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createProvince = catchAsync(async (req, res) => {
    const province = await provinceServices.createProvince(req.body);
    res.status(httpStatus.CREATED).send(province);
});

const getProvince = catchAsync(async (req, res) => {
    const province = await provinceServices.getProvinceById(req.params.provinceId);
    const isDeleted = province?.isDeleted;
    if (isDeleted || !province) {
        throw new ApiError(httpStatus.NOT_FOUND, "Province not found");
    }
    res.send(province);
});

const getProvinces = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name"]);
    const filter = filterObject.provinceFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await provinceServices.queryProvinces(filter, options);
    res.send(result);
});

const updateProvince = catchAsync(async (req, res) => {
    const province = await provinceServices.updateProvince(req.params.provinceId, req.body);
    res.send(province);
});

const getTopProvinces = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["number"]);
    // console.log("queryData54343", queryData);
    const result = await provinceServices.getTopProvinces(queryData);
    // console.log("result4334", result)
    res.send(result);
});

const deleteProvince = catchAsync(async (req, res) => {
    await provinceServices.softDeleteProvinceById(req.params.provinceId);
    res.status(httpStatus.NO_CONTENT).send();
});

const updateNumberOfCourtsInProvince = async (req, res) => {
    const provincesCount = await provinceServices.courtCounter();
    // console.log("provincesCount", provincesCount);
    res.send(provincesCount);
}

export default {
    createProvince,
    getProvince,
    getProvinces,
    updateProvince,
    deleteProvince,
    getTopProvinces,
    updateNumberOfCourtsInProvince
};