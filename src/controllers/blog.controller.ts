import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Blog } from "../models";

async function createblog(req: Request, res:Response, next:NextFunction){
     try {
    const { title, content } = req.body;
    console.log("I am executed", req.body)

    if (!title || !content) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Title and content are required",
      });
    }

    // multer adds `file` to req
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
    });

    res.status(StatusCodes.CREATED).json({
      data: blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create blog",
    });
  }
}

export { createblog };