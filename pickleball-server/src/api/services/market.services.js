import httpStatus from "http-status";
import { Market } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createMarket = async (marketData) => {
    return Market.create(marketData);
};

const queryMarkets = async (filter, options) => {
    const markets = await Market.queryAndPaginate(filter, options);
    return markets;
};

const getAllMarkets = async () => {
    const markets = await Market.find();
    return markets;
};

const getMarketById = async (id) => {
    checkIdType(id);
    const market = Market.findById(id);
    if (!market) {
        throw new ApiError(httpStatus.NOT_FOUND, "Market not found");
    }
    return market;
};

const editMarketById = async (id, marketData) => {
    const market = await getMarketById(id);
    Object.assign(market, marketData);
    await market.save();
    return market;
};


const softDeleteMarketById = async (id) => {
    const market = await getMarketById(id);
    // Soft delete
    Object.assign(market, { isDeleted: true });
    await market.save();
    return market;
};

const hardDeleteMarketById = async (id) => {
    const market = await getMarketById(id);
    await market.remove();
    return market;
};

export default {
    createMarket,
    queryMarkets,
    getAllMarkets,
    getMarketById,
    editMarketById,
    softDeleteMarketById,
    hardDeleteMarketById
};