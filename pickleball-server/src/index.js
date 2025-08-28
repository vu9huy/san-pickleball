import app from "./app.js";
import logger from "./config/logger.js";
import "dotenv/config.js";
import connectDB from "./config/databaseConnect.js";

const PORT = process.env.PORT;

let server;

const runServer = async () => {
    await connectDB();
    server = app.listen(PORT || 2704, () => {
        logger.info(`Listening to http://localhost:${PORT}`);
    });
};
runServer();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
