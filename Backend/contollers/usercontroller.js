import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
//register user
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser=async(req,res)=>{
      const {name,password,email}=req.body;
      try{
        //check if user already already exist
        const exist=await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"user already exist"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email address"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user =await newuser.save()
        const token=createToken(user._id)
        res.json({success:true,token})

      }
      catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
      }
}
export {loginUser,registerUser}