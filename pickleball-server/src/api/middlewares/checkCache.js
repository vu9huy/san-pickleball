// import redisClient from "../../config/cache/redisCache.js";

const checkCache = async (req, res, next) => {
    // const key = req.originalUrl;
    // console.log("keyfffffggffg", key);
    // try {
    //     const cachedData = await redisClient.get(key);
    //     console.log("cachedDatafggf", cachedData);
    //     if (cachedData) {
    //         return res.json(JSON.parse(cachedData));
    //     }
    //     next();
    // } catch (err) {
    //     console.error('Redis error:', err);
    //     next();
    // }
};

export default checkCache;