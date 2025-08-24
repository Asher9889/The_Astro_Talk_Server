import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { StatusCodes } from "http-status-codes";
import { ApiSuccessResponse, ApiErrorResponse, authResponse } from "../utils";

async function signUp(req:Request, res:Response, next:NextFunction):Promise<Response | void>{
    /**
     * 1. Schema validation handled by userValidate Middleware.
     */
    try {
        const  { data, flag } = await authService.register(req.body);
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.created, data))
    } catch (error:any) {
        if(error instanceof ApiErrorResponse){
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }

    
}

export { signUp }