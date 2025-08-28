import morgan from "morgan";
import globalConfig from "./globalConfig.js";
import morganLogger from "./morganLogger.js";

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const successResponseFormat = ":remote-addr - :method :url :status - :response-time ms";
const errorResponseFormat = ":remote-addr :method :url :status - :response-time ms - message: :message";

const morganSuccessHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => morganLogger.info(message.trim()) }
});

const morganErrorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => morganLogger.error(message.trim()) }
});

export {
    morganSuccessHandler,
    morganErrorHandler
};
