import httpStatus from "http-status";
import { blogServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createBlog = catchAsync(async (req, res) => {
    const blog = await blogServices.createBlog(req.body);
    res.status(httpStatus.CREATED).send(blog);
});

const getBlog = catchAsync(async (req, res) => {
    const blog = await blogServices.getBlogById(req.params.blogId);
    const isDeleted = blog?.isDeleted;
    if (isDeleted || !blog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
    }
    res.send(blog);
});

const getBlogs = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name"]);
    const filter = filterObject.blogFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await blogServices.queryBlogs(filter, options);
    res.send(result);
});

const updateBlog = catchAsync(async (req, res) => {
    const blog = await blogServices.updateBlog(req.params.blogId, req.body);
    res.send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
    await blogServices.softDeleteBlogById(req.params.blogId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createBlog,
    getBlog,
    getBlogs,
    updateBlog,
    deleteBlog
};