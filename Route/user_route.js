import express from "express";
import {test} from '../Controllers/user_controller.js'

const router=express.Router();

router.get('/',test);

export default router