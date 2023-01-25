import express from 'express';
import {adminSignUp,login,getAdminById,list} from '../controller/admincontroller'
const router = express.Router();

router.post("/adminSignup",adminSignUp)
router.post("/adminlogin",login)
router.get("/getAdminById",getAdminById)
router.get("/list",list)
export default router;