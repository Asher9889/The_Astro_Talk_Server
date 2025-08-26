import express from "express";
import { authController, blogsController } from "../../controllers";

import { validateUser } from "../../middlewares";

const router = express.Router();

router.post("/register", validateUser, authController.signUp);
router.post("/login", authController.login);
// router.get("/", blogsController.getBlogs);
// router.get("/:id", blogsController.getBlog);
// router.put("/:id", upload.single("image"), blogsController.updateBlog);
// router.delete("/:id", blogsController.deleteBlog);


export default router;