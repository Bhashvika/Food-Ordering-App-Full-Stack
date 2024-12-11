import express from "express";
import { loginUser,registerUser } from "../contollers/usercontroller.js"
import userModel from "../models/usermodel.js";
const userRouter=express.Router();
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser);
export default userRouter;