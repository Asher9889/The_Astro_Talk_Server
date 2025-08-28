import express, { NextFunction, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { config } from './config/index';
import cors from 'cors';
import apiRoutes from "./routes/index";
import { checkRouteExists, globalErrorHandler } from './utils/index';
import connectMongoDB from './db/connectMongoDB';
import path from 'path';

const app = express();

connectMongoDB().catch((err) => {
    console.log(err)
})


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Range"], // 👈 added Range
  exposedHeaders: ["Content-Range"], // so React-Admin can see pagination
}));

// Handle OPTIONS preflight for all routes




app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded())
app.use(cookieParser()); 

app.use("/api", apiRoutes)
console.log(path.join(__dirname, '../uploads'))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// app.use('/temp', express.static(path.join(__dirname, '../temp')));

app.use(checkRouteExists);
app.use(globalErrorHandler as any);
app.listen(config.port, () => {
    console.log(`Server is ruuning on Port ${config.port}`);
})