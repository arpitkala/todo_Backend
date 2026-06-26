import express from 'express';
import cors  from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app= express();

//Middleware
app.use(cors());
app.use(express.json());


//Connect to DB
connectDB(); 

//Routes
//app.use('/api', todoRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/auth', authRoutes)

//use error middleware
app.use(errorHandler);  

//Start Server
 const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});