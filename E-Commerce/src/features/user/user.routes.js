
import jwtAuth from "../../middlewares/jwt.middleware.js";
import UserController from "./user.controller.js";
import express from "express";

const userController = new UserController();

const router = express.Router();

router.post("/signup",(req,res,next)=>{
    userController.signUp(req, res, next);
});
router.post("/signin",(req,res)=>{
    userController.signIn(req, res);
});

router.put("/resetPassword", jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next);
})


export default router;