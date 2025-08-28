import express from "express";
import { userController } from "../../controllers/index.js";
import { checkRole, verifyAccessToken } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/locations")
    .get(verifyAccessToken, userController.getUserLocations);

router
    .route("/")
    .post(userController.createUser)
    .get(userController.getUsers);

router
    .route("/:userId")
    .get(userController.getUser)
    .patch(verifyAccessToken, checkRole("manageUsers"), userController.updateUser)
    .delete(verifyAccessToken, checkRole("manageUsers"), userController.deleteUser);

export default router;