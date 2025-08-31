import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface IUser {
    fullName: string;
    email: string;
    phone: number;
    password: string
}

interface ILoginUser {
    email: string;
    password: string;
}


interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

interface AuthRequest extends Request {
    user?: any; // you can make this a proper User type
}


export { IUser, ILoginUser, DecodedToken, AuthRequest };