import express from "express";
import { marketController } from "../../controllers/index.js";
import { checkMarketPermission, verifyAccessToken } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/")
    .get(marketController.getMarkets)
    .post(verifyAccessToken, checkMarketPermission("manageMarkets"), marketController.createMarket);

router
    .route("/:marketId")
    .get(marketController.getMarket)
    .patch(verifyAccessToken, checkMarketPermission("manageMarkets"), marketController.updateMarket)
    .delete(verifyAccessToken, checkMarketPermission("manageMarkets"), marketController.deleteMarket);

export default router;