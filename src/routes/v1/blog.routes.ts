import express from "express";
import { blogsController } from "../../controllers";
import { upload } from "../../middlewares/index";

const router = express.Router();

router.post("/create", upload.single("image"), blogsController.createblog);

export default router;