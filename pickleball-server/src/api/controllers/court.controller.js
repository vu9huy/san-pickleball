import httpStatus from "http-status";
import { cloudinaryServices, courtServices, userServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";
import mongoose from "mongoose";
import { shopifyUploadMultipleBase64Images } from "../services/shopify.services.js";
// import redisClient from "../../config/cache/redisCache.js";

const handleImages = async (images, userId) => {
    const base64Images = images.map((image, index) => {
        return image.url;
    });
    const result = await cloudinaryServices.uploadMultipleImages(base64Images, userId);
    return result;
};

const createCourt = catchAsync(async (req, res) => {
    const courtData = req.body;

    // handle owner
    const userId = courtData.ownerId;
    const user = await userServices.getUserById(userId);
    courtData.owner = {
        id: new mongoose.Types.ObjectId(userId),
        name: user.name,
        contact: user.contact || {}
    };

    //handle court images
    const courtImages = courtData.images;
    const courtImagesHandled = await handleImages(courtImages, userId);
    courtData.images = courtImagesHandled;

    //handle bookingInfo images
    const bookingInfoImage = courtData.bookingInfo.images;
    const bookingInfoImageHandled = await handleImages(bookingInfoImage, userId);
    courtData.bookingInfo.image = bookingInfoImageHandled;

    //create court
    const court = await courtServices.createCourt(courtData);

    // add courtId to user
    const courtId = court.id;
    const ownerCourtList = user.courts || [];
    ownerCourtList.push(new mongoose.Types.ObjectId(courtId));
    await userServices.editUserById(userId, { courts: ownerCourtList });
    res.status(httpStatus.CREATED).send(court);
});

// const getCourt = catchAsync(async (req, res) => {
//     const court = await courtServices.getCourtById(req.params.courtId);
//     const isDeleted = court?.isDeleted;
//     if (isDeleted || !court) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Court not found");
//     }
//     res.send(court);
// });

const getCourt = catchAsync(async (req, res) => {
    const court = await courtServices.getCourtBySlug(req.params.slug);
    const isDeleted = court?.isDeleted;
    if (isDeleted || !court) {
        throw new ApiError(httpStatus.NOT_FOUND, "Court not found");
    }
    res.send(court);
});

const getCourts = catchAsync(async (req, res) => {
    const filter = filterObject.courtFilter(req.query);
    const options = pick(req.query, ["sortBy", "limit", "page", "list"]);
    const result = await courtServices.queryCourts(filter, options);

    // await new Promise(r => setTimeout(r, 2000));
    // redisClient.set(req.originalUrl, JSON.stringify(result), { EX: 600, NX: true });

    res.send(result);
});

const getGeoLocationCourts = catchAsync(async (req, res) => {
    const filter = filterObject.courtFilter(req.query);
    const options = pick(req.query, ["sortBy", "limit", "page", "list"]);
    const fields = ["geolocation", "slug"];
    const result = await courtServices.queryCourts(filter, options, fields);
    res.send(result);
});

const updateCourt = catchAsync(async (req, res) => {
    const courtData = req.body;
    const userId = courtData.ownerId;

    //handle court images, sau này có thể handle xóa ảnh so với database
    const courtImages = courtData.images;
    const imagesHandled = await handleImages(courtImages, userId);
    courtData.images = imagesHandled;

    // const shopifyImages = await shopifyUploadMultipleBase64Images(courtImages, courtData.name);

    //handle bookingInfo images
    const bookingInfoImage = courtData.bookingInfo.images;
    const bookingInfoImageHandled = await handleImages(bookingInfoImage, userId);
    courtData.bookingInfo.images = bookingInfoImageHandled;

    const court = await courtServices.editCourtById(req.params.courtId, courtData);
    res.send(court);
});

const deleteCourt = catchAsync(async (req, res) => {
    await courtServices.softDeleteCourtById(req.params.courtId);
    res.status(httpStatus.NO_CONTENT).send();
});

const counterView = catchAsync(async (req, res) => {
    const court = await courtServices.counterView(req.params.courtId);
    res.status(httpStatus.OK).send({ views: court.views });
});

export default {
    createCourt,
    getCourt,
    getCourts,
    getGeoLocationCourts,
    updateCourt,
    deleteCourt,
    counterView
};