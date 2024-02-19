import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/userModel.js";

//env variables
const {DEFAULT_PICTURE, DEFAULT_STATUS} = process.env;

export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData;

    //check if fields are empty
    if(!name || !email || !password){
        throw createHttpError.BadRequest("Please fill all fields.");
    }

    //check name length
    if(!validator.isLength(name, {
        min: 2,
        max:30
    }))
    {
        throw createHttpError.BadRequest("Please make sure your name is between 2 and 50 characters.");
    } 

    //check status lenght

    if(status && status.length > 64){
        throw createHttpError.BadRequest(
            "Please make sure your status is less than 64 characters."
            );
    };

    //check if email address is valid 
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest(
            "Please make sure to provide a valid email address."
            );
    }

    //chech if user is already exists
    const chechDb = await UserModel.findOne({email});
    if(chechDb) {
        throw createHttpError.Conflict("Please try again with a different email address, this email already exist.");
    }

    //check password length
    if(!validator.isLength(password, {
        min: 6,
        max: 128
    }))
    {
        throw createHttpError.BadRequest("Please make sure your password is between 6 to 128 characters.");
    }

    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password,
    }).save();

    return user;
 
};