import mongoose from "mongoose"; 

export const connectDB=async()=>{
    try{
      
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to DB");
    }catch(error){
        console.log("Error in DB connections");
        console.log(error.message);
        process.exit(1);
    }
}