import connectDB from "./db/index.js"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
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

export  { app }