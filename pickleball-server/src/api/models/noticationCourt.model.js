import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const noticationCourtSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    court: { type: objectId, ref: "Court", required: true },
    images: [
        { type: String, required: false, trim: true }
    ],
    isHidden: { type: Boolean, required: true, default: false, private: true },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

noticationCourtSchema.plugin(toJSON);
noticationCourtSchema.plugin(queryAndPaginate);

noticationCourtSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const NoticationCourt = mongoose.model("NoticationCourt", noticationCourtSchema);
export default NoticationCourt;
