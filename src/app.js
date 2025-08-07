import connectDB from "./db/index.js"
import cors from "cors"
import dotenv from "dotenv"
import express from "express" 
import cookieParser from "cookie-parser";
const app= express()

dotenv.config({
    path:"../.env"
})

app.use(cors({
    origin: process.env.CORS_ORIGIN , 
    credentials: true
}))
app.use(express.json ({}));
app.use(express.urlencoded ({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from './routes/route.js'
app.use("/api/v1/users" , userRouter) 

import taskRouter from "./routes/task.route.js"
app.use("/api/v1/tasks" , taskRouter)


export  { app }