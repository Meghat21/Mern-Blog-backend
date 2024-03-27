import express from "express";
import {test,updateUser} from '../Controllers/user_controller.js'
import {verifyToken} from '../Utils/verifyUser.js'

const router=express.Router();

router.get('/',test);
router.put('/update/:userId',verifyToken,updateUser)

export default router