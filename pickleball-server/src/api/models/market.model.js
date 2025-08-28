import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const marketTypes = [
    "equipment",
    "court"
];

const marketSchema = new Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    marketType: { type: String, enum: marketTypes, default: "equipment", required: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    seller: { type: objectId, ref: "User", required: true },
    price: { type: Number, required: true },
    refreshTime: { type: Date, required: true, default: new Date().toISOString() },
    metadata: [
        {
            key: { type: String, required: false, trim: true },
            value: { type: String, required: false, trim: true }
        }
    ],
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

marketSchema.plugin(toJSON);
marketSchema.plugin(queryAndPaginate);

marketSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const Market = mongoose.model("Market", marketSchema);
export default Market;
