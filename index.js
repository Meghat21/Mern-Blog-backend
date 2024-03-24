import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

//connect to mongodb
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Mongodb connected")
})
.catch((err)=>{
    console.log(err)
})


const app=express();

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Connected to ${process.env.PORT}`)
})