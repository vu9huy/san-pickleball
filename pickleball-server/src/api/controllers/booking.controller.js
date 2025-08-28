import httpStatus from "http-status";
import { bookingServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createBooking = catchAsync(async (req, res) => {
    const booking = await bookingServices.createBooking(req.body);
    res.status(httpStatus.CREATED).send(booking);
});

const getBooking = catchAsync(async (req, res) => {
    const booking = await bookingServices.getBookingById(req.params.bookingId);
    if (!booking) {
        throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
    }
    res.send(booking);
});

const getBookings = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["court", "bookingInfo"]);
    // if (!queryData?.court?.id) {
    //     console.log("43434343");
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Missing court id");
    // }
    const filter = filterObject.bookingFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await bookingServices.queryBookings(filter, options);
    res.send(result);
});

const updateBooking = catchAsync(async (req, res) => {
    const booking = await bookingServices.editBookingById(req.params.bookingId, req.body);
    res.send(booking);
});

const deleteBooking = catchAsync(async (req, res) => {
    await bookingServices.softDeleteBookingById(req.params.bookingId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createBooking,
    getBooking,
    getBookings,
    updateBooking,
    deleteBooking
};