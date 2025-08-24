import { StatusCodes } from "http-status-codes";
import { IUser } from "../interfaces";
import { User } from "../models";
import { ApiErrorResponse, authResponse } from "../utils";

async function register(user:IUser){
  try {
		const isFound = await User.findOne({ $or : [
		    {email: user.email},
		    {phone: user.phone}
		  ]})
		
		  if (isFound) {
		    throw new ApiErrorResponse(StatusCodes.CONFLICT, authResponse.ifFound);
		  }
		
			const newUser = new User(user);
		  await newUser.save();
		
		  return {data: newUser, flag: true};
	} catch (error:any) {
			if(error instanceof ApiErrorResponse){
				throw error;
			}
			throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
	}
}

export { register };