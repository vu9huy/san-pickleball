import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const partnerType = ["player", "coach", "club_member", "student"];

const partnerLookingSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, enum: partnerType, required: true },
    location: {
        province: { type: String, required: false, trim: true },
        district: { type: String, required: false, trim: true },
        courtId: { type: objectId, ref: "Court", required: false }
    },
    contactInfo: {
        userId: { type: objectId, ref: "User", required: false },
        email: { type: String, required: false, trim: true },
        phone: { type: String, required: false, trim: true },
        facebook: { type: String, required: false, trim: true },
        zalo: { type: String, required: false, trim: true }
    },
    time: { type: String, required: false, trim: true },
    expriesTime: { type: Date, required: true },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

partnerLookingSchema.plugin(toJSON);
partnerLookingSchema.plugin(queryAndPaginate);

partnerLookingSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const PartnerLooking = mongoose.model("PartnerLooking", partnerLookingSchema);
export default PartnerLooking;
