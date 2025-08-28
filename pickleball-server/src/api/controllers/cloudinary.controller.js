import cloudinaryServices from "../services/cloudinary.services.js";
import logger from "../../config/logger.js";
import httpStatus from "http-status";
import catchAsync from "../../config/errors/catchAsync.js";
import "dotenv/config";
import ApiError from "../../config/errors/ApiError.js";

const uploadImages = catchAsync(async (req, res) => {
    const imagesList = req.body.images;
    if (imagesList.length > 10) {
        throw new ApiError(httpStatus.BAD_REQUEST, "The number of images must be less than 10");
    }
    const response = await cloudinaryServices.uploadMultipleImages(imagesList);
    // logger.info("uploadImages", response);
    res.send(response);
});

export default {
    uploadImages
};