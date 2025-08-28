import express from "express";
import { courtController } from "../../controllers/index.js";
import { checkCourtPermission, verifyAccessToken } from "../../middlewares/auth.js";
import checkCache from "../../middlewares/checkCache.js";

const router = express.Router();


router
    .route("/")
    .get(/* checkCache, */ courtController.getCourts)
    .post(courtController.createCourt);

router
    .route("/geo-location")
    .get(courtController.getGeoLocationCourts)

router
    .route("/:slug")
    .get(courtController.getCourt)

router
    .route("/:courtId")
    // .get(courtController.getCourt)
    .patch(verifyAccessToken, checkCourtPermission("manageCourts"), courtController.updateCourt)
    .delete(verifyAccessToken, checkCourtPermission("manageCourts"), courtController.deleteCourt);

router
    .route("/counter-views/:courtId")
    .post(courtController.counterView);

export default router;