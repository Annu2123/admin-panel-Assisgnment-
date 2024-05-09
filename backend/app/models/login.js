const {Schema,model}=require('mongoose')
const loginSchema=new Schema({
     user_Name:String,
     password:String
})
const Login=model('Login',loginSchema)
module.exports=Login