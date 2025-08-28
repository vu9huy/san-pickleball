import mongoose from "mongoose";
import logger from "./logger.js";
import globalConfig from "./globalConfig.js";

const connectDB = async () => {
    const maxRetries = 3;
    let attempt = 0;
    // console.log("globalConfig.mongodb.url439834", globalConfig.mongodb.url);
    const connectWithRetry = async () => {
        attempt++;
        try {
            await mongoose.connect(globalConfig.mongodb.url);
            logger.info("MongoDB connected successfully.");
        } catch (err) {
            logger.error(`Failed to connect to MongoDB (attempt ${attempt}/${maxRetries}):`, err);
            if (attempt < maxRetries) {
                logger.log("Retrying connection in 5 seconds...");
                setTimeout(connectWithRetry, 5000); // Wait 5 seconds before retrying
            } else {
                logger.error("Max retries reached. Exiting...");
                process.exit(1); // Exit process with failure
            }
        }
    };

    await connectWithRetry();
};
export default connectDB;