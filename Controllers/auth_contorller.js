import User from "../Models/user_models.js"
import bcyptjs from 'bcryptjs'
// import errorHandler from "../Middleware/errorHandler.js";
import jwt from 'jsonwebtoken';

export const signupHandler=async(req,res)=>{
    const {username,email,password}=req.body;

    console.log(req.body)
    if(!username || !email || !password || username=='' || email == '' || password==''){
        res.status(401).json({
            msg:"error! all fields are required to be filled"
        })
    }

    const handlePassword=bcyptjs.hashSync(password,10)
    const newUser=new User({
        username,
        email,
        password:handlePassword
    })

    await newUser.save()
    .then(()=>{
        res.status(200)
        .json({
            msg:"successful"
        })
    })



    
}


export const signinHandler=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password || email==='' || password===''){
        res.status(401).json({
            msg:"error! all fields are required to be filled"
        })       
    }

    try {
        const validUser=await User.findOne({email});

        if(!validUser){
            res.status(401).json({
                msg:"User not found"
            })
        }

        const validPassword=bcyptjs.compareSync(password,validUser.password);
        if(!validPassword){
            res.status(401).json({
                msg:"User not found"
            })
        }   

        const token=jwt.sign({
            id:validUser._id,
            email:validUser.email
        },process.env.SECRET_KEY);

        const{password:pass,...rest}=validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json({
            res:rest
        })

    } catch (error) {
        
    }
}


export const signinHandlerGoogle=async(req,res)=>{
    //check if user exist
    const {email,name,googlePhoto}=req.body
    try {
        const user=await User.findOne({email});

        if(user){
            const token=jwt.sign({
                id:user._id,
                email:user.email,
                profilePicture:googlePhoto
                
            },process.env.SECRET_KEY);

            const {password,...rest}=user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json({
                rest
            })
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            
            const hashPassword=bcyptjs.hashSync(generatedPassword,10);
            const newUser=new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashPassword
            });

            await newUser.save();
            const token=jwt.sign({
                id:user._id,
                email:user.email
                
            },process.env.SECRET_KEY);

            const {password,...rest}=user._doc;

            res.status(200)
            .cookie('access_token',token,{
                httpOnly:true
            })
            .json(rest);
            
        }
    } catch (error) {
        console.log(error)       
    }
    //if exist ,sign in with incoming details
    //else create new account
}