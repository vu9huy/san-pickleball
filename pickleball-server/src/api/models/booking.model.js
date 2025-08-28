import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const bookingTypes = [
    "fixed_day",
    "flexible"
];

// const fixedBookingTypes = [
//     "day",
//     "week"
// ];

const bookingSchema = new Schema({
    court: {
        id: { type: objectId, ref: "Court", required: true },
        number: { type: Number, required: true }
    },
    disabled: {
        value: { type: Boolean, default: false },
        dates: [
            { type: Date }
        ]
    },
    bookingInfo: {
        startTime: {
            hours: { type: Number, required: true },
            minutes: { type: Number, required: true }
        },
        endTime: {
            hours: { type: Number, required: true },
            minutes: { type: Number, required: true }
        },
        type: { type: String, enum: bookingTypes, default: "flexible" },
        date: { type: Date },
        day: { type: Number },
        note: { type: String, trim: true },
        user: {
            id: { type: objectId, ref: "user", required: false },
            name: { type: String, trim: true }
        },
        creator: {
            id: { type: objectId, ref: "user", required: false },
            name: { type: String, trim: true }
        }
    },
    confirmed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

bookingSchema.plugin(toJSON);
bookingSchema.plugin(queryAndPaginate);

bookingSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
