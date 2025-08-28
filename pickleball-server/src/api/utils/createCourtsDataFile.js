import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import globalConfig from "../../config/globalConfig.js";
import logger from "../../config/logger.js";
import { Court } from "../models/index.js";

const formattedDocuments = (documents) => {
    const newDoc = documents.map(doc => {
        doc.id = doc._id;
        delete doc._id;
        return doc;
    });
    return newDoc;
};

// Replace the following with your MongoDB connection string
const uri = globalConfig.mongodb.url;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputFilePath = path.join(__dirname, "../../data", "courts.json");

const selectedFields = "name description location geolocation images feature numberOfCourts availability";

async function exportCollection() {
    try {
        await mongoose.connect(uri);
        logger.info("Connected to MongoDB");
        let documents = await Court.find().select(selectedFields).lean().exec();

        documents = formattedDocuments(documents);

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

        fs.writeFileSync(outputFilePath, JSON.stringify(documents, null, 2));
        logger.info(`Collection data has been written to ${outputFilePath}`);
    } catch (error) {
        logger.error("Error exporting collection:", error);
    } finally {
        await mongoose.disconnect();
    }
}

exportCollection();