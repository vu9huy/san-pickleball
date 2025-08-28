import httpStatus from "http-status";
import { Blog } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createBlog = async (blogData) => {
    return Blog.create(blogData);
};

const queryBlogs = async (filter, options) => {
    const blogs = await Blog.queryAndPaginate(filter, options);
    return blogs;
};

const getAllBlogs = async () => {
    const blogs = await Blog.find();
    return blogs;
};

const getBlogById = async (id) => {
    checkIdType(id);
    const blog = Blog.findById(id);
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
    }
    return blog;
};

const editBlogById = async (id, blogData) => {
    const blog = await getBlogById(id);
    Object.assign(blog, blogData);
    await blog.save();
    return blog;
};


const softDeleteBlogById = async (id) => {
    const blog = await getBlogById(id);
    // Soft delete
    Object.assign(blog, { isDeleted: true });
    await blog.save();
    return blog;
};

const hardDeleteBlogById = async (id) => {
    const blog = await getBlogById(id);
    await blog.remove();
    return blog;
};

export default {
    createBlog,
    queryBlogs,
    getAllBlogs,
    getBlogById,
    editBlogById,
    softDeleteBlogById,
    hardDeleteBlogById
};