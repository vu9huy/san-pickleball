import httpStatus from "http-status";
import { Booking } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createBooking = async (bookingData) => {
    return Booking.create(bookingData);
};

const queryBookings = async (filter, options) => {
    const bookings = await Booking.queryAndPaginate(filter, options);
    return bookings;
};

const getAllBookings = async () => {
    const bookings = await Booking.find();
    return bookings;
};

const getBookingById = async (id) => {
    checkIdType(id);
    const booking = Booking.findById(id);
    if (!booking) {
        throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
    }
    return booking;
};

const editBookingById = async (id, bookingData) => {
    const booking = await getBookingById(id);
    Object.assign(booking, bookingData);
    await booking.save();
    return booking;
};


const softDeleteBookingById = async (id) => {
    const booking = await getBookingById(id);
    // Soft delete
    Object.assign(booking, { isDeleted: true });
    await booking.save();
    return booking;
};

const hardDeleteBookingById = async (id) => {
    const booking = await getBookingById(id);
    await booking.remove();
    return booking;
};

export default {
    createBooking,
    queryBookings,
    getAllBookings,
    getBookingById,
    editBookingById,
    softDeleteBookingById,
    hardDeleteBookingById
};