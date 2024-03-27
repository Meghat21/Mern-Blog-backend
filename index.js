import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './Route/user_route.js'
import authRoute from './Route/auth_route.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";


dotenv.config();

//handle json request


//connect to mongodb
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Mongodb connected")
})
.catch((err)=>{
    console.log(err)
})


const app=express();

//handle json request
app.use(express.json())
app.use(cookieParser())

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Connected to ${process.env.PORT}`)
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
