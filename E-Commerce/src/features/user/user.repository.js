import { Mongoose } from "mongoose";

import { userSchema } from "./user.schema.js";
import mongoose from "mongoose";

import { ApplicationError } from "../../error-Handler/applicationError.js";

// creating model from schema.

const UserModel = mongoose.model('User', userSchema)

export default class UserRepository {

    async resetPassword(userId, hashedPassword){
        try{
            let user = await UserModel.findById(userId);
            if(user){
            user.password =hashedPassword;
            user.save();
            }else{
                throw new Error ("No such user found");
            }


        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database while resetting password", 500);

        }
    }

    async signUp (user) {
        try{

            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;

        }catch(err){
            if(err instanceof mongoose.Error.ValidationError) {
                throw err;  

            }else{

                console.log(err);
                throw new ApplicationError("something went wrong with database while signUp", 500);
                }

        }

    }

    // async signIn (email, password) {

    //     try{

    //        return await UserModel.findOne({email, password})

    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("something went wrong with database while signin", 500);
    //     }

    // }


    async findByEmail (email){
        try{
            return await UserModel.findOne({email});

        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database while finding through email", 500)
        }
    }

}