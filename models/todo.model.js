import mongoose from "mongoose";
import User from "./user.model.js";
const todoSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is Required"],
        trim:true,
    },
    description:{
        type: String,
       default:"",
    },
    iscompleted: {
        type: Boolean,
        default: false,
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
      }
},{
    timestamps:true,
}
  
);
export default mongoose.model("todo",todoSchema);