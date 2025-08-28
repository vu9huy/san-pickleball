import express from "express";
import { provinceController } from "../../controllers/index.js";

const router = express.Router();

router
    .route("/")
    .get(provinceController.getProvinces);

router
    .route("/top")
    .get(provinceController.getTopProvinces);

router
    .route("/court-counter")
    .post(provinceController.updateNumberOfCourtsInProvince);

export default router;