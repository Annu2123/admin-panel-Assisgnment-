const { validationResult } = require('express-validator')
const Employee=require('../models/employee-model')
const employeeCntrl={}
employeeCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{ 
        console.log(body)
        const employee= new Employee(body)
        const img=req.file
        employee.img=img.filename
            await  employee.save()
            res.status(202).json(employee)

    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
employeeCntrl.update = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id = req.params.id;
    try {
        const body = req.body
        const img = req.file
        if (img) {
            body.img = img.filename;
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(id, body, { new: true })
        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" })
        }
        res.status(200).json(updatedEmployee)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error" })
    }
}
employeeCntrl.list=async(req,res)=>{
    try{
        const employee=await Employee.find()
        res.status(202).json(employee)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
employeeCntrl.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const employee=await Employee.findByIdAndDelete(id)
        res.status(202).json(employee)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
module.exports=employeeCntrl