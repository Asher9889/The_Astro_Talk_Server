import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, validateUserSchema } from "../utils";
import { StatusCodes } from "http-status-codes";

function validateUser (req: Request, res: Response, next:NextFunction){
    const { value, error} = validateUserSchema(req.body);
    
    if(error){
        const statusCode = StatusCodes.BAD_REQUEST;
        const msg = error.message;
        return next(new ApiErrorResponse(statusCode, msg));
    }

    next();
}

export default validateUser;