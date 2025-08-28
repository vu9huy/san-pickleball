import express from "express";
import { googlePlaceController } from "../../controllers/index.js";
import { checkCourtPermission, verifyAccessToken } from "../../middlewares/auth.js";
import checkCache from "../../middlewares/checkCache.js";

const router = express.Router();


// router
//     .route("/")
//     .get(/* checkCache, */ googlePlaceController.getGooglePlace)
// .post(googlePlaceController.createCourt);

// router
//     .route("/geo-location")
//     .get(googlePlaceController.getGeoLocationCourts)

router
    .route("/:placeId")
    .get(googlePlaceController.getGooglePlace)

// router
//     .route("/:courtId")
//     // .get(courtController.getCourt)
//     .patch(verifyAccessToken, checkCourtPermission("manageCourts"), googlePlaceController.updateCourt)
//     .delete(verifyAccessToken, checkCourtPermission("manageCourts"), googlePlaceController.deleteCourt);


export default router;