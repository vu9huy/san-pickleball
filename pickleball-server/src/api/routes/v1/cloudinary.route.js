import express from "express";
import { cloudinaryController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/upload-images")
    .post(cloudinaryController.uploadImages);

export default router;