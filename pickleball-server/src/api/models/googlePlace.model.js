import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;


const googlePlaceSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    place_id: { type: String, required: true, unique: true, trim: true },
    address_components: [
        {
            long_name: { type: String, required: false, trim: true },
            short_name: { type: String, required: false, trim: true },
            types: [{ type: String, required: false, trim: true }]
        }
    ],
    imageUrls: [{
        url: { type: String, required: false, trim: true },
        alt: { type: String, required: false, trim: true }
    }],
    formatted_address: { type: String, required: false, trim: true },
    formatted_phone_number: { type: String, required: false, trim: true },
    geometry: {
        location: {
            lat: { type: Number },
            lng: { type: Number }
        },
        viewport: {
            northeast: {
                lat: { type: Number },
                lng: { type: Number }
            },
            southwest: {
                lat: { type: Number },
                lng: { type: Number }
            }
        }
    },
    opening_hours: {
        open_now: { type: Boolean, default: false },
        periods: [
            {
                open: {
                    day: { type: Number },
                    time: { type: String, required: false, trim: true }
                }
            }
        ],
        weekday_text: [{ type: String, required: false, trim: true }]
    },
    photos: [
        {
            height: { type: Number },
            html_attributions: [{ type: String, required: false, trim: true }],
            photo_reference: { type: String, required: false, trim: true },
            width: { type: Number }
        }
    ],
    plus_code: {
        compound_code: { type: String, required: false, trim: true },
        global_code: { type: String, required: false, trim: true }
    },
    rating: { type: Number },
    user_ratings_total: { type: Number },
    reviews: [
        {
            author_name: { type: String, required: false, trim: true },
            author_url: { type: String, required: false, trim: true },
            language: { type: String, required: false, trim: true },
            original_language: { type: String, required: false, trim: true },
            profile_photo_url: { type: String, required: false, trim: true },
            rating: { type: Number },
            relative_time_description: { type: String, required: false, trim: true },
            text: { type: String, required: false, trim: true },
            time: { type: Number },
            translated: { type: Boolean, default: false }
        }
    ],
    url: { type: String, required: false, trim: true },
    vicinity: { type: String, required: false, trim: true },
    website: { type: String, required: false, trim: true },

    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

googlePlaceSchema.plugin(toJSON);
googlePlaceSchema.plugin(queryAndPaginate);

googlePlaceSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

googlePlaceSchema.index({ place_id: 1 }, { unique: true });

const GooglePlace = mongoose.model("GooglePlace", googlePlaceSchema);
export default GooglePlace;
