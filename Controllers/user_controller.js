import bcryptjs from 'bcryptjs'
import User from "../Models/user_models.js";


export const test=(req,res)=>{
    res.json({
        msg:"Hello"
    })
}

export const updateUser=async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return res.status(402).json({msg:'not authenticated'})
    }
    console.log(req.user)
    console.log(req.body)
    if(req.body.password){
    
        req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.includes(' ')){
            return res.status(404).json({msg:"no space for username"})
        }
    }
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password
            }
        },{new:true});
        const {password,...rest}=updatedUser._doc;
        res.status(200).json({
            msg:rest
        })
    } catch (error) {
        return res.status(402).json({msg:'not authenticated'})
        
    }
}   