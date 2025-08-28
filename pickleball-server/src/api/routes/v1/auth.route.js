import express from "express";
import { authController } from "../../controllers/index.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google-login", authController.loginWithGoogle);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshTokens);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authController.changePassword);
// Gọi khi user click vào xác thực email trên frontend.
router.post("/send-verification-email", authController.sendVerificationEmail);
// Gọi khi user click vào nút xác nhận email trong email.
router.get("/verify-email", authController.verifyEmail);

export default router;