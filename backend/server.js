require("dotenv").config()
const express=require('express')
const multer=require('multer')
const cors=require('cors')
const port=process.env.PORT
const app=express()
app.use('/uploads',express.static('uploads'))
const configDb=require('./config/db')
configDb()
const storage=multer.diskStorage(
    {
        destination:function (req,file,cb){
            return cb(null,"./uploads")
        },
        filename:function(req,file,cb){
            return cb(null,`${Date.now()}-${file.originalname}`)
        }
    }
)
const upload=multer({storage})
app.use(cors())
app.use(express.json())
const loginCntrl=require('./app/controllers/login-controller')
const loginValidation=require('./app/validation')
const employeeCntrl=require('./app/controllers/employee-controller')
const { checkSchema } = require("express-validator")
const employeeValidation=require('./app/validation/employee-validation')
//user 
app.post('/api/createUser',loginCntrl.create)
app.post('/api/login',checkSchema(loginValidation),loginCntrl.login)
app.post('/api/employee/create',upload.single('img'),checkSchema(employeeValidation),employeeCntrl.create)
app.put('/api/update/employee/:id',upload.single('img'),checkSchema(employeeValidation),employeeCntrl.update)
app.get('/api/employee/list',employeeCntrl.list)
app.delete('/api/employee/remove/:id',employeeCntrl.remove)
app.listen(port,()=>{
    console.log("server is running in " + port )
})
