import express from "express";
import { partnerLookingController } from "../../controllers/index.js";
import { checkPartnerLookingPermission, verifyAccessToken } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/")
    .get(partnerLookingController.getPartnerLookings)
    .post(verifyAccessToken, checkPartnerLookingPermission("managePartnerLookings"), partnerLookingController.createPartnerLooking);

router
    .route("/:partnerLookingId")
    .get(partnerLookingController.getPartnerLooking)
    .patch(verifyAccessToken, checkPartnerLookingPermission("managePartnerLookings"), partnerLookingController.updatePartnerLooking)
    .delete(verifyAccessToken, checkPartnerLookingPermission("managePartnerLookings"), partnerLookingController.deletePartnerLooking);

export default router;