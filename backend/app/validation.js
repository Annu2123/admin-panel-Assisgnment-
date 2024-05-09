const loginValidation={
    user_Name:{
        notEmpty:{
            errorMessage:"name is require"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password is require"
        }
    }
}
module.exports=loginValidation