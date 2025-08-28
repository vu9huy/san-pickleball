import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10,
    skipSuccessfulRequests: true,
    handler: function (req, res) {
        res.status(429).send({
            status: 429,
            message: "Too many requests (auth)!"
        });
    }
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 150,
    handler: function (req, res) {
        res.status(429).send({
            status: 429,
            message: "Too many requests (api)!"
        });
    },
    skip: (req, res) => {
        if (req.ip === "::ffff:127.0.0.1")
            return true;
        return false;
    }
});

export {
    authLimiter,
    apiLimiter
};
