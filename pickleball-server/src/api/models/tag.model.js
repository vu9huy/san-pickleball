import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });


const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
