import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import validator from "validator";
import { asyncHandler } from "../middlewares/asyncHandler.js";

//register
export const register=asyncHandler(    async(req,res)=>{
    const { name, email,password}=req.body;

    // validation
    if(!name || name.trim()===""){
        return res.status(400).json({
            success:false,
            message:"Name is required"
        })
    }

    if(!email || !validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Email is required"
        })
    }

    if(!password || password.trim()===""){
        return res.status(400).json({
            success:false,
            message:"Password is required"
        })
    }

    // check if user is already exist
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"User already exist"
        })
    }
    // hash the password
    const hashedPassword=await bcrypt.hash(password,10);

    //create the user
    const newUser=await User.create({
        name,
        email,
        password:hashedPassword
    
    })
    

    //return the response
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }
    })
})

//login
export const login= asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    //validation of email and password
    if(!email || !validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Email is required"
        })
    }

    if(!password || password.trim()===""){
        return res.status(400).json({
            success:false,
            message:"Password is required"
        })
    }
    //check if user already exist
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password"
        })
    }

    //check if password is correct
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Password is incorrect"
        })
    }

    //create token
    
    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

    //return the response
    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:{
            id:user._id,
            name:user.name,
            email:user.email,
            token
        }
    })

})