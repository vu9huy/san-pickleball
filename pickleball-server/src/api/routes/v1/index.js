import express from "express";
import courtRouter from "./court.route.js";
import googlePlaceRouter from "./googlePlace.route.js";
import blogRouter from "./blog.route.js";
import topicRouter from "./topic.route.js";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import cloudinaryRouter from "./cloudinary.route.js";
import benchmarkRouter from "./benchmark.route.js";
import manualRouter from "./manual.route.js";
import bookingRoute from "./booking.route.js";
import provinceRoute from "./province.route.js";

const router = express.Router();

router.use("/courts", courtRouter);
router.use("/google-place", googlePlaceRouter);
router.use("/users", userRouter);
router.use("/blogs", blogRouter);
router.use("/topics", topicRouter);
router.use("/bookings", bookingRoute);
router.use("/provinces", provinceRoute);
router.use("/auth", authRouter);
router.use("/cloudinary", cloudinaryRouter);
router.use("/benchmark", benchmarkRouter);
router.use("/manual", manualRouter);

export default router;