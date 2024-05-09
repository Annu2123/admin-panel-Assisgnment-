const {Schema,model}=require('mongoose')
const employeeSchema=new Schema({
    name:String,
	email:String,
	mobile_No:Number,
	designation:String,	
	gender:String,	
	course:[String],
	img:String

},{timestamps:true})
const Employee=model('Employee',employeeSchema)
module.exports=Employee