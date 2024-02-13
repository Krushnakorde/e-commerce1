import { ApplicationError } from "../../error-Handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";


export default class UserController{

    constructor (){
        this.userRepository = new UserRepository();
    }


    async resetPassword(req, res, next){
        const {newPassword}= req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const userId = req.userID;
        try{

            await this.userRepository.resetPassword(userId, hashedPassword);
            res.status(200).send("Password is updated");

        }catch(err){
            console.log(err);
            console.log("Passing error to middleware");
            next(err);
        }

    }



    async signUp(req, res, next){

        try{

        const {name, email, password, type} = req.body;

        // const hashedPassword = await bcrypt.hash(password, 12)
        
        // const user = new UserModel(name, email, hashedPassword, type);
        const user = new UserModel(name, email, password, type);

        await this.userRepository.signUp(user)

        res.status(201).send(user);
        }catch(err){
            next(err);
        }

       

    }


    async signIn(req, res, next){
        try{

       const user = await this.userRepository.findByEmail(req.body.email);
       if(!user){
        return res.status(400).send("Incorrect Credentials");
       }else{

        const result = await bcrypt.compare(req.body.password, user.password)
        
        if(result){
              //1.Create token.


        // 2. Send token.
        const token = jwt.sign({userID: user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:'1h'});
        // return res.status(200).send("Login Successful");
        

        return res.status(200).send(token);

        }else{

            return res.status(400).send("Incorrect Credentials")

        }

      
       }
    }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong")
    }

    }
}