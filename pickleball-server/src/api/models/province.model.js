import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;

const geolocationSchema = Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

const districtSchema = Schema({
    value: { type: String, default: "" },
    label: { type: String, required: true },
    slug: { type: String, default: "" },
    geolocation: { type: geolocationSchema, required: true }
});

const provinceSchema = Schema({
    value: { type: String, required: true, unique: true },
    numberOfCourts: { type: Number, required: true, default: 0 },
    label: { type: String, required: true },
    geolocation: { type: geolocationSchema, required: true },
    districts: { type: [districtSchema], default: [] },
    slug: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

provinceSchema.plugin(toJSON);
provinceSchema.plugin(queryAndPaginate);

provinceSchema.index({ value: 1 });
const Province = mongoose.model("Province", provinceSchema);
export default Province;
