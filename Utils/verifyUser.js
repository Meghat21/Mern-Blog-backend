import jwt from 'jsonwebtoken'
import {ApiError} from '../Middleware/errorHandler.js'


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(403).json({
            msg:"not auhtorized"
        })
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({
                msg:"not auhtorized"
            })
        }
        req.user=user;
        next();
    })
}