import { StatusCodes } from "http-status-codes";
import { ILoginUser, IUser } from "../interfaces";
import { User } from "../models";
import { ApiErrorResponse, authResponse } from "../utils";

type SafeUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accessToken?:string
};

async function register(user: IUser) {
	try {
		const isFound = await User.findOne({
			$or: [
				{ email: user.email },
				{ phone: user.phone }
			]
		})

		if (isFound) {
			throw new ApiErrorResponse(StatusCodes.CONFLICT, authResponse.ifFound);
		}

		const newUser = new User(user);
		await newUser.save();

		return { data: newUser, flag: true };
	} catch (error: any) {
		if (error instanceof ApiErrorResponse) {
			throw error;
		}
		throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
	}
}

async function login(user: ILoginUser) {
	const existingUser = await User.findOne({ email: user.email });
	if (!existingUser) {
		throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.notFound);
	}

	const isPasswordValid = await existingUser.comparePassword(user.password);
	if (!isPasswordValid) {
		throw new ApiErrorResponse(StatusCodes.BAD_REQUEST, authResponse.inValidCredentials)
	}

	const safeUser: SafeUser = {
		id: existingUser._id as string,
		fullName: existingUser.fullName,
		email: existingUser.email,
		phone: String(existingUser.phone),
	};


	const accessToken = existingUser.generateAccessToken();
	const refreshToken = existingUser.generateRefreshToken();

	return { accessToken, refreshToken, safeUser }
}

export { register, login };