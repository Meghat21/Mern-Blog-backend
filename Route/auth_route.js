import express from 'express'
import {signupHandler,signinHandler,signinHandlerGoogle} from '../Controllers/auth_contorller.js'

const router=express.Router();

router.post('/signup',signupHandler)
router.post('/signin',signinHandler)
router.post('/google',signinHandlerGoogle)



export default router;