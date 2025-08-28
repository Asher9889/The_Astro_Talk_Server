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


export { IUser, ILoginUser, DecodedToken };