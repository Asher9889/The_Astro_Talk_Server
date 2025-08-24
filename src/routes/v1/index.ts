import express from "express";
import blogRoutes from "./blog.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);

export default router;