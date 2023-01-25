import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import admin from '../model/adminmodel'
import bcrypt from 'bcrypt';


//------------admin signup ---------------
export const adminSignUp = async(req,res) => {
    try{
    const adminDetails = new admin ({
        fullname : req.body.fullname,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,9),
    })
    const adminData = await adminDetails.save();

    if(adminData){
    return res.send({
        status : true,
        message : "user ne successfully signup kar liya",
        result : adminData
    })}
}catch(e){
    throw e
}
}

//------------------- login ---------------------------

export const login = async(req,res) => {
    try{
        const{email,password} = req.body;
        const result = await admin.findOne({email})
        console.log(result)
        const isValid = bcrypt.compareSync(password,result.password)
        
        let payload = {};
        payload.id = result.id;
        jwt.sign(payload,"key",{
            'expiresIn':'24h'
        },
        (err,token) => {
            if(isValid){
            console.log(token)
                res.send({status:true,message:"successfull",adminDetails:result,result:token})
            }else{
                res.send({status:200,message:"failed",result:err})
            }
        })
    }catch(e){
        throw e
    }
}

//---------------- admin id -------------------
export const getAdminById = async (req, res) => {
    try {
      var id = req.result.id;
      var adminDataa = await admin.findById(id)
      res.send({ "status": 200, "message": "Success", result: adminDataa })
    }
    catch (e) {
      throw e
    }
}

export const list = async(req,res) => {
    const List = await admin.find({})
    res.send({
        result:List
    })
}