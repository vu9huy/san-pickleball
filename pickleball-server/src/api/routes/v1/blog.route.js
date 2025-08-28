import express from "express";
import { blogController } from "../../controllers/index.js";
import { checkBlogPermission, verifyAccessToken } from "../../middlewares/auth.js";

const router = express.Router();

router
    .route("/")
    .get(blogController.getBlogs)
    .post(verifyAccessToken, checkBlogPermission("manageBlogs"), blogController.createBlog);

router
    .route("/:blogId")
    .get(blogController.getBlog)
    .patch(verifyAccessToken, checkBlogPermission("manageBlogs"), blogController.updateBlog)
    .delete(verifyAccessToken, checkBlogPermission("manageBlogs"), blogController.deleteBlog);

export default router;