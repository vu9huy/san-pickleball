import express from "express";
import { cloudinaryController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/cloudinary/upload-images")
    .post(cloudinaryController.uploadImages);

router
    .route("/shopify/upload-images")
    .post(cloudinaryController.uploadImages);

export default router;