import mongoose from "mongoose";

const { Schema } = mongoose;

const topicSchema = new Schema({
    title: { type: String, required: true, trim: true },
    handle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });


const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
