import { createLogger, format, transports, config } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import globalConfig from "./globalConfig.js";
import { customLevels, errorFormat, myFormat } from "./logger.js";

const { combine, timestamp, colorize, simple, json } = format;


const transportsConfig = [
    new transports.Console({
        format: format.combine(
            myFormat,
            format.colorize({ all: true })
        )
    })
];

const exceptionHandlersConfig = [
    new transports.Console({
        format: combine(
            timestamp(),
            colorize(),
            simple()
        )
    })
];

// if enviroment is product save log to file
if (globalConfig.env === "product") {
    transportsConfig.push(
        new DailyRotateFile({
            filename: "logs/http/all/application-all-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }),
        new DailyRotateFile({
            level: "error",
            filename: "logs/http/errors/application-error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }));
}
// if enviroment is product save log to file
if (globalConfig.env === "product") {
    exceptionHandlersConfig.push(
        new DailyRotateFile({
            filename: "logs/http/exceptions/application-exception-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }));
}

const morganLogger = createLogger({
    levels: customLevels.levels,
    level: process.env.LOG_LEVEL || "debug",
    format: combine(
        errorFormat,
        // colorize(),
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A"
        }),
        myFormat,
        json()
    ),
    transports: transportsConfig,
    exceptionHandlers: exceptionHandlersConfig
});

config.addColors(customLevels.colors);

export default morganLogger;