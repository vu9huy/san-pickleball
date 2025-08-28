import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

// const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURDAY", "FRIDAY", "SATUDAY", "SUNDAY"];
const days = [0, 1, 2, 3, 4, 5, 6];

const surface = [
    "asphalt",
    "wood",
    "carpet",
    "acrylic",
    "concrete"
];

const courtSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: false, trim: true },
        placeId: { type: String, required: false, unique: true, trim: true },
        slug: { type: String, required: true, unique: true },
        owner: {
            id: { type: objectId, ref: "User", required: false },
            name: { type: String, required: false, trim: true },
            // contact: {
            //     facebook: { type: String, required: false, trim: true },
            //     zalo: { type: String, required: false, trim: true },
            //     phone: { type: String, required: false, trim: true }
            // }
        },
        moder: [
            {
                id: { type: objectId, ref: "User", required: true },
                name: { type: String, required: true, trim: true },
                // contact: {
                //     facebook: { type: String, required: false, trim: true },
                //     zalo: { type: String, required: false, trim: true },
                //     phone: { type: String, required: false, trim: true }
                // }
            }
        ],
        social: {
            facebook: { type: String, required: false, trim: true },
            zalo: { type: String, required: false, trim: true },
            phone: { type: String, required: false, trim: true }
        },
        location: {
            address: { type: String, required: false, trim: true },
            province: { type: String, required: false, trim: true },
            district: { type: String, required: false, trim: true }
        },
        geolocation: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        },
        numberOfCourts: { type: Number, required: false },
        images: [
            {
                url: { type: String, required: true, trim: true },
                alt: { type: String, required: true, trim: true }
            }
        ],
        googlePlaceImages: [
            {
                url: { type: String, required: true, trim: true },
                alt: { type: String, required: true, trim: true }
            }
        ],
        feature: {
            indoor: { type: Boolean, default: false },
            outdoor: { type: Boolean, default: false },
            lighted: { type: Boolean, default: false },
            covered: { type: Boolean, default: false }
        },
        utilities: [
            {
                name: { type: String, required: false, trim: true },
                description: { type: String, required: false, trim: true }
            }
        ],
        amenities: {
            bar_canteen: { type: Boolean, default: false },
            locker_room: { type: Boolean, default: false },
            restroom: { type: Boolean, default: false },
            trainer: { type: Boolean, default: false },
            parking_spaces: { type: Boolean, default: false },
            equipment_rental: { type: Boolean, default: false },
            equipment_free: { type: Boolean, default: false },
            wifi: { type: Boolean, default: false },
            spectator_areas: { type: Boolean, default: false },
            break_areas: { type: Boolean, default: false },
            air_conditioning: { type: Boolean, default: false }
        },
        surface: { type: String, enum: surface, required: true },
        availability: [
            {
                label: { type: String, required: true, trim: true },
                days: [
                    { type: Number, enum: days, required: true }
                ],
                openTime: {
                    hours: { type: Number, required: true },
                    minutes: { type: Number, required: true }
                },
                closeTime: {
                    hours: { type: Number, required: true },
                    minutes: { type: Number, required: true }
                }
            }
        ],
        bookingInfo: {
            images: [{
                url: { type: String, required: false, trim: true },
                alt: { type: String, required: false, trim: true }
            }],
            // averagePrice: { type: Number, required: true },
            priceRange: {
                min: { type: Number, required: false },
                max: { type: Number, required: false }
            },
            detail: [
                {
                    label: { type: String, required: false, trim: true },
                    value: { type: Number, required: false }
                }
            ],
            othersService: [
                {
                    serviceName: { type: String, required: false, trim: true },
                    serviceList: [
                        {
                            name: { type: String, required: false, trim: true },
                            note: { type: String, required: false, trim: true },
                            price: { type: Number, required: false }
                        }
                    ]
                }
            ]
        },
        isPaid: { type: Boolean, required: true, default: true, private: true },
        isDeleted: { type: Boolean, required: true, default: false, private: true },
        views: { type: Number, required: false, default: 0 }
    }, { timestamps: true }
);

courtSchema.plugin(toJSON);
courtSchema.plugin(queryAndPaginate);

courtSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false, isPaid: true });
    next();
});

courtSchema.index({ slug: 1 }, { unique: true });

const Court = mongoose.model("Court", courtSchema);
export default Court;