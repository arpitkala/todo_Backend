import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

import { asyncHandler } from "../middlewares/asyncHandler.js";

//Create TODO-POST API

export const createTODO = asyncHandler(async(req,res)=>{
    
   const{title, description}  = req.body;

   //validation
   if(!title || title.trim()===""){
 return res.status(400).json({
    success:false,
    message:"Title is required",
});
   }
   
   const todo=await Todo.create({
    title,
    description,
    user:req.user._id

   })

   return res.status(201).json({
    success:true,
    message:"Todo Created Successfully",
    todo
   })
})

//Get All TODO-GET API

export const getTodos=asyncHandler(async(req,res)=>{
   

//Query prams
const { search, sort, page=1, limit=10} = req.query;

// Base query
let query ={
    user:req.user._id
};
//Search by title
if(search){
    
    query.title = {$regex: search, $options: "i"};
}

//Sorting
let sortOption = {};
    if(sort === "asc") sortOption.createdAt=1; //1 for ascending
  else sortOption.createdAt=-1; // -1 for descending
       
//Pagination
      const pageNumber = Number(page);
const limitNumber = Number(limit);

const skip = (pageNumber - 1) * limitNumber;

       const todos=await Todo.find(query)
       .sort(sortOption)
       .skip(skip)
       .limit(limitNumber);
       const totalTodos=await Todo.countDocuments(query);

       return res.status(200).json({
        success:true,
        message:"Todos Fetched Successfully",
        total:totalTodos,
        page:Number(page),
        limit:Number(limit),
        data:todos
       });
})

//Get All TODO by ID - GET API
 export const getTodoById=asyncHandler(async(req,res)=>{
     
            const { id} =req.params;

            // validate ID based on mongoose
            if(!mongoose.isValidObjectId(id)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Todo ID"
                });
            }

            const todo=await Todo.findOne({
                user:req.user._id,
                _id:id
  });
            //if todo is not found
            if(!todo){
                return res.status(404).json({
                    success:false,
                    message:"Todo Not Found"
                });
            }
            // if todo is found
            return res.status(200).json({
                success:true,
                message:"Todo Fetched Successfully",
                data:todo
            });
   
 })

 //Update TODO by ID - PUT API

export const updateTodoByID =asyncHandler(async(req,res)=>{
    

const { id}=req.params;
const { title,description}=req.body;

//validate ID based on mongoose
if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
        success:false,
        message:"Invalid Todo ID"
    });
}

//valid input
if(!title || title.trim()===""){
    return res.status(400).json({
        success:false,
        message:"Title is required",
    });
}
    
//Update todo
 const todo = await Todo.findOneAndUpdate({
    user:req.user._id,
    _id:id
    }, {
    title,
    description
 }, {new:true, runValidators:true}
 );

 //if todo is not found
 if(!todo){
    return res.status(404).json({
        success:false,
        message:"Todo Not Found"
    });
 }
 
 return res.status(200).json({
    success:true,
    message:"Todo Updated Successfully",
    data:todo
 });
})

// TOGGLE TODO by ID - PATCH API

export const toggleTodoByID =asyncHandler( async(req,res)=>{
   
        const {id}=req.params;

        //validate ID based on mongoose
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Todo ID"
            });
        }


const todo=await Todo.findOne({
    _id:id,
    user:req.user._id
});

//if todo not found
if(!todo){
    return res.status(404).json({
        success:false,
        message:"Todo Not Found"
    });
}

//flip the isCompleted
todo.iscompleted = !todo.iscompleted;
await todo.save();

return res.status(200).json({
    success:true,
    message:"Todo toggle Successfully",
    data:todo
});
})

//delete by ID - DELETE API

export const  deleteByID=asyncHandler(async(req,res)=>{
    
 const { id} =req.params;

 //validate ID based on mongoose
 if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
        success:false,
        message:"Invalid Todo ID"
    });
 }

//delete todo
 const todo=await Todo.findOneAndDelete({
    _id:id,
    user:req.user._id
 });

 //if todo is not found
 if(!todo){
    return res.status(404).json({
        success:false,
        message:"Todo Not Found"
    });
 }

 //if todo found and deleted
 return res.status(200).json({
    success:true,
    message:"Todo Deleted Successfully",
    data:todo
 });
    
})