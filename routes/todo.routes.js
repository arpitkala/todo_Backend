 import express from 'express';
 import {createTODO, getTodos,getTodoById,updateTodoByID,toggleTodoByID,deleteByID} from '../controllers/todo.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
 const router=express.Router();



 //create todo
 router.post('/add',createTODO); 

 //get todos
 router.get('/',getTodos);

 //get todos by id
 router.get('/:id',getTodoById);

 //update todo by id
 router.put('/:id',updateTodoByID);

 //Toggle todo by id
 router.patch('/:id/toggle',toggleTodoByID);

 //delete todo by id
 router.delete('/:id',deleteByID);


 export default router;



 
