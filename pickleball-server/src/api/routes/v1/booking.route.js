import express from "express";
import { bookingController } from "../../controllers/index.js";
import { checkCreateBookingPermission, checkEditBookingPermission, verifyAccessToken } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/")
    .get(bookingController.getBookings)
    .post(verifyAccessToken, checkCreateBookingPermission("manageBookings"), bookingController.createBooking);

router
    .route("/:bookingId")
    .get(bookingController.getBooking)
    .patch(verifyAccessToken, checkEditBookingPermission("manageBookings"), bookingController.updateBooking)
    .delete(verifyAccessToken, checkEditBookingPermission("manageBookings"), bookingController.deleteBooking);

export default router;