import express from "express";
import { benchmarkController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/")
    .get(benchmarkController.benchmark1);

export default router;