
// import googlePlaces from "../../data/google_place_courts.json" assert { type: "json" };
// import googlePlacesData from "../../data/pickleball.googleplaces.json" assert { type: "json" };
// import fs from "fs";
// const googlePlacesData = JSON.parse(
//   fs.readFileSync("../../data/pickleball.googleplaces.json", "utf8")
// );
import addCourtsByGooglePlace from "../utils/manual/addCourtsByGooglePlace.js";
import addGooglePlace from "../utils/manual/addGooglePlaces.js";
import getPhotoByReference from "../utils/manual/getPhotoByReference.js";
import uploadBase64Image from "../utils/manual/shopifyUpload.js";
import googlePlaceServices from "../../api/services/googlePlace.services.js";
import courtServices from "../../api/services/court.services.js";
import mongoose from "mongoose";
import fs from "fs";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function convertToSlug(text) {
    return text
        .normalize("NFD") // Normalize accented characters
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
        .trim() // Trim leading/trailing spaces
        .replace(/\s+/g, "-"); // Replace spaces with dashes
}


const manual = async (req, res) => {
    try {
        // await addGooglePlace();
        // await addCourtsByGooglePlace();


        // LẤY ẢNH TỪ GOOGLE PLACE VÀ UP LÊN SHOPIFY
        // const googlePlaces = await googlePlaceServices.getAllGooglePlaces();
        // const googlePlaces1 = googlePlaces.slice(25, 100);
        // let j = 0;
        // for (const place of googlePlacesNoImage) {
        //     const images = place.photos;
        //     const imageUrls = [];
        //     console.log("start", place.name);
        //     let i = 1;
        //     for (const image of images) {
        //         await sleep(1000);
        //         const photoReference = image.photo_reference;
        //         const width = image.width;
        //         const base64Data = await getPhotoByReference(photoReference, width);
        //         const fileName = convertToSlug(`${place.name} ${i}`);
        //         // console.log("fileName3434", fileName);
        //         const imageUrl = await uploadBase64Image({ fileName, base64Data });
        //         const imageObject = {
        //             url: imageUrl,
        //             alt: place.name
        //         }
        //         if (imageUrl) {
        //             imageUrls.push(imageObject);
        //         }
        //         i++;
        //     }
        //     console.log("end", j, place.name);
        //     j++;
        //     // console.log("imageUrlsdsdsds", imageUrls);
        //     const updateGooglePlace = await googlePlaceServices.editGooglePlaceById(place.id, { imageUrls });
        // }


        const courts = await courtServices.getAllCourts();
        let j = 0;
        // const newOwnerId = new mongoose.Types.ObjectId('668908c74b2f7bdaf8c607f7');
        for (const court of courts) {
            const placeId = court.placeId;
            console.log("placeId", placeId);
            const place = await googlePlaceServices.getGooglePlaceByPlaceId(placeId);
            if (place) {
                const googlePlaceImages = place.imageUrls;
                const updateCourt = await courtServices.editCourtById(court.id, { googlePlaceImages });
                console.log("updateCourt", updateCourt);
            }
        }

        res.send("ok");
    } catch (error) {
        console.log("error", error);
    }
};

export default {
    manual
};
