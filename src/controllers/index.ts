import { signUp, login, refresh, logout, me } from "./auth.controller";
import { createblog, getBlogs, getBlog, updateBlog, deleteBlog } from "./blog.controller";

const blogsController = {
    createblog, getBlogs, getBlog, updateBlog, deleteBlog
}

const authController = {
    signUp, login, refresh, logout, me
}

export { blogsController, authController }