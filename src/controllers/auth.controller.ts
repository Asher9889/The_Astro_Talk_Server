import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { StatusCodes } from "http-status-codes";
import { ApiSuccessResponse, ApiErrorResponse, authResponse, validateLoginUserSchema } from "../utils";

async function signUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    /**
     * 1. Schema validation handled by userValidate Middleware.
     */
    try {
        const { data, flag } = await authService.register(req.body);
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.created, data))
    } catch (error: any) {
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }


}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const { value, error } = validateLoginUserSchema(req.body);
        if (error) {
            console.error("validation error", error)
            throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, error.message);
        }

        const { refreshToken, accessToken, safeUser } = await authService.login(value);

        // Set refresh token in secure cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,   // JS cannot access cookie
            // secure: false,     // true: Only send over HTTPS
            // sameSite: "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        safeUser.accessToken = accessToken
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.loggedIn, safeUser));

    } catch (error: any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//------- refresh ------>
async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.noRefreshToken);
        }
        const tokens = await authService.refresh(token);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,   // JS cannot access cookie
            // secure: false,     // true: Only send over HTTPS
            // sameSite: "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, authResponse.tokenRefreshed, tokens));

    } catch (error: any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
};

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "strict",
        });
    
        return res.status(StatusCodes.OK).json(new ApiSuccessResponse(StatusCodes.OK, "Logged out successfully"));
    
    } catch (error:any) {
        console.log("error is:", error)
        if (error instanceof ApiErrorResponse) {
            return next(error);
        }
        next(new ApiSuccessResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}


export { signUp, login, refresh, logout }