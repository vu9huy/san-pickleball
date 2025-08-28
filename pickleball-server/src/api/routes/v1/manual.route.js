import express from "express";
import { manualController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/")
    .get(manualController.manual);

export default router;