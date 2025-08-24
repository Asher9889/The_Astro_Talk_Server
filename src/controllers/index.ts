import { signUp } from "./auth.controller";
import { createblog, getBlogs, getBlog, updateBlog, deleteBlog } from "./blog.controller";

const blogsController = {
    createblog, getBlogs, getBlog, updateBlog, deleteBlog
}

const authController = {
    signUp
}

export { blogsController, authController }