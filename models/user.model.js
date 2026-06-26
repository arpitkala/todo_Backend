import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Name is Compulsory"],
        trim: true
    },
    email:{
        type: String,
        required:[true,"Email.is Required"],
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required:[true,"Password is Compulsory"],
        trim: true
    }
    // mobNo:{
    //     type: Number,
    //     trim: true,
    //     required:false,
    //     unique:true
    // }
},{
        timestamps:true
    }
);

export default mongoose.model("User",userSchema);