const { validationResult } = require('express-validator')
const Login=require('../models/login')
const loginCntrl={}
loginCntrl.create=async(req,res)=>{
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({error:errors.array()})
    // }
    const body=req.body
    try{
        const login=await Login.create(body)
        res.status(200).json(login)
    }catch(err){
        res.status(400).json({error:"internal server error"})
    }
    
}
loginCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(402).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await Login.findOne({user_Name:body.user_Name,password:body.password})
        if(!user){
            return res.status(404).json({error:"password or email is wrong"})
        }     
       res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(400).json({error:"internal server error"})
    }
}
module.exports=loginCntrl