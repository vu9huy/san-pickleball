import { createLogger, format, transports, config } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import globalConfig from "./globalConfig.js";

const { combine, timestamp, printf, colorize, errors, simple, json } = format;

export const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "green",
        debug: "blue"
    }
};

// Format này sẽ không hiển thị vị trí lỗi
// const myFormat = printf(({ timestamp, level, message }) => {
//     return `[${timestamp}] ${level}: ${message}`;
// });

// Format này sẽ hiển thị vị trí lỗi
export const myFormat = format.printf(info => {
    let { timestamp, level, code, stack, message } = info;

    // print out http error code w/ a space if we have one
    code = code ? ` ${code}` : "";
    // print the stack if we have it, message otherwise.
    message = stack || message;

    return `[${timestamp}] ${level}${code}: ${message}`;
});

export const errorFormat = errors({ stack: true });

// const errorFilter = format((info, opts) => {
//     return info.level === 'error' ? info : false;
// });


// const infoFilter = format((info, opts) => {
//     return info.level === 'info' ? info : false;
// });

// const dailyRotateTransport = new DailyRotateFile({
//     filename: "logs/system/all/application-all-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: true,
//     maxSize: "50m",
//     maxFiles: "30d"
// })

// const errorDailyRotateTransport = new DailyRotateFile({
//     level: "error",
//     filename: "logs/system/errors/application-error-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: true,
//     maxSize: "50m",
//     maxFiles: "30d"
// });

// const exceptionRotateTransport = new DailyRotateFile({
//     filename: "logs/system/exceptions/application-exception-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: true,
//     maxSize: "50m",
//     maxFiles: "30d"
// });

const transportsConfig = [
    new transports.Console({
        format: format.combine(
            myFormat,
            format.colorize({ all: true })
        )
    })
    // dailyRotateTransport,
    // errorDailyRotateTransport,
    // new transports.File({
    //     filename: 'logs/application-error.log',
    //     level: 'error',
    //     format: combine(errorFilter(), timestamp(), format.json()),
    // }),
    // new transports.File({ filename: 'logs/application.log' }),
];

const exceptionHandlersConfig = [
    new transports.Console({
        format: combine(
            timestamp(),
            colorize(),
            simple()
        )
    })
    // exceptionRotateTransport
    // new transports.File({ filename: 'logs/exceptions.log' })
];

// if enviroment is product save log to file, current not use because server have log of pm2
if (globalConfig.env === "notuse") {
    transportsConfig.push(
        new DailyRotateFile({
            filename: "logs/system/all/application-all-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }),
        new DailyRotateFile({
            level: "error",
            filename: "logs/system/errors/application-error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }));
}
// if enviroment is product save log to file, current not use because server have log of pm2
if (globalConfig.env === "notuse") {
    exceptionHandlersConfig.push(
        new DailyRotateFile({
            filename: "logs/system/exceptions/application-exception-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "50m",
            maxFiles: "30d"
        }));
}

const logger = createLogger({
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

export default logger;