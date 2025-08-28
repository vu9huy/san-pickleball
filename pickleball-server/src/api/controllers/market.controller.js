import httpStatus from "http-status";
import { marketServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createMarket = catchAsync(async (req, res) => {
    const market = await marketServices.createMarket(req.body);
    res.status(httpStatus.CREATED).send(market);
});

const getMarket = catchAsync(async (req, res) => {
    const market = await marketServices.getMarketById(req.params.marketId);
    const isDeleted = market?.isDeleted;
    if (isDeleted || !market) {
        throw new ApiError(httpStatus.NOT_FOUND, "Market not found");
    }
    res.send(market);
});

const getMarkets = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name"]);
    const filter = filterObject.marketFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await marketServices.queryMarkets(filter, options);
    res.send(result);
});

const updateMarket = catchAsync(async (req, res) => {
    const market = await marketServices.updateMarket(req.params.marketId, req.body);
    res.send(market);
});

const deleteMarket = catchAsync(async (req, res) => {
    await marketServices.softDeleteMarketById(req.params.marketId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createMarket,
    getMarket,
    getMarkets,
    updateMarket,
    deleteMarket
};