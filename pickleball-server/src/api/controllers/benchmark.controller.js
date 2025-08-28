import { courtServices } from "../services/index.js";
import { filterObject, pick } from "../utils/index.js";
import { performance } from "perf_hooks";

const benchmark1 = async (req, res) => {
    const startMiddleware = performance.now();
    const queryData = pick(req.query, ["name", "province", "district"]);
    const filter = filterObject.courtFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page", "list"]);
    const result = await courtServices.queryCourts(filter, options);

    // redisClient.set(req.originalUrl, JSON.stringify(result), { EX: 600, NX: true });
    const endMiddleware = performance.now();
    res.send(result);
};

export default {
    benchmark1
};
