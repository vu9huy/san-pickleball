import globalConfig from "../../config/globalConfig.js";
import { v2 as cloudinary } from "cloudinary";
import httpStatus from "http-status";
import async from "async";
import ApiError from "../../config/errors/ApiError.js";

cloudinary.config({
    secure: true,
    cloud_name: globalConfig.cloudinary.name,
    api_key: globalConfig.cloudinary.apiKey,
    api_secret: globalConfig.cloudinary.apiSecret
});


const uploadImage = async (imageBase64, options) => {
    if (!imageBase64.startsWith("data:image/")) {
        return {
            url: imageBase64
        };
    }
    const uploadImageResponse = await cloudinary.uploader.upload(imageBase64, options, (error, result) => {
        if (result && result.secure_url) {
            return result.secure_url;
        }
        return null;
    });
    return uploadImageResponse;
};

const uploadMultipleImages = async (imageBase64s, path) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: `${globalConfig.cloudinary.courtFolderName}/${path}`
        // Thêm text vào ảnh
        // transformation: [
        //     {
        //         overlay: {
        //             font_family: "Arial",
        //             font_size: 20,
        //             fon_weigth: 600,
        //             text: "sanpickleball.xyz"
        //         },
        //         gravity: "south_east",
        //         x: 20,
        //         y: 20,
        //         color: "#FFFFFF",
        //         opacity: 70
        //     }
        // ]
    };

    return new Promise((resolve, reject) => {
        async.mapLimit(imageBase64s, 3, async function (imageBase64) {
            const response = await uploadImage(imageBase64, options);
            return {
                alt: "Sân pickleball",
                url: response?.url
            };
        }, (err, results) => {
            if (err) {
                throw new ApiError(httpStatus.BAD_REQUEST, err);
            } else {
                resolve(results);
            }
        });
    });
};

export default {
    uploadMultipleImages
};