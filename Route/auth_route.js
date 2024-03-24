import express from 'express'
import {signupHandler} from '../Controllers/auth_contorller.js'

const router=express.Router();

router.post('/signup',signupHandler)

export default router;