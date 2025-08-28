import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import routes from "./api/routes/v1/index.js";
import { errorConverter, errorHandler } from "./api/middlewares/errorHandler.js";
import httpStatus from "http-status";
import globalConfig from "./config/globalConfig.js";
import { apiLimiter, authLimiter } from "./api/middlewares/rateLimiter.js";
import { morganSuccessHandler, morganErrorHandler } from "./config/morgan.js";
import ApiError from "./config/errors/ApiError.js";
import cookieParser from "cookie-parser";

const app = express();

// if (config.env !== 'test') {
app.use(morganSuccessHandler);
app.use(morganErrorHandler);
// }

// set security HTTP headers
app.use(helmet());

// parse json request body, limit: "25mb" help send image data not get error "request entity too large"
app.use(express.json({ limit: "25mb" }));

// parse urlencoded request body, limit: "25mb" help send image data not get error "request entity too large"
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// gzip compression
app.use(compression());
// enable cors
const corsOptions = {
    origin: ["http://localhost:3000", "https://www.sanpickleball.xyz", "http://localhost:8080"], // Allow only this origin
    credentials: true
};
//
app.use(cors(corsOptions));

// enabling cors pre-flight
app.options("*", cors());

app.use(cookieParser());

// limit repeated failed requests to auth endpoints
if (globalConfig.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

// limit repeated failed requests to all endpoints
app.use("/api/v1", apiLimiter);

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found url"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
