import express from 'express'
import {signupHandler,signinHandler} from '../Controllers/auth_contorller.js'

const router=express.Router();

router.post('/signup',signupHandler)
router.post('/signin',signinHandler)


export default router;