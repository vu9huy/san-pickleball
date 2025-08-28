import mongoose from "mongoose";
import { queryAndPaginate, toJSON } from "./plugin/index.js";

const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const blogSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, required: false, trim: true },
    image: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    tags: [
        { type: objectId, ref: "Tag", required: false }
    ],
    topic: { type: objectId, ref: "Topic", required: false },
    isDeleted: { type: Boolean, required: true, default: false, private: true }
}, { timestamps: true });

blogSchema.plugin(toJSON);
blogSchema.plugin(queryAndPaginate);

blogSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
