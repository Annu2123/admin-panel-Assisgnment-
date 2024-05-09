const Employee = require("../models/employee-model")

employeeValidation = {
    name: {
        in:['body'],
        notEmpty: {
            errorMessage: "name is require"
        }
    },
        email: {
            in:['body'],
            notEmpty: {
                errorMessage: "email is require"
            },
            isEmail: {
                errorMessage: "email should be email formate"
            },
            custom: {
                options: async function (value) {
                    const employee = await Employee.findOne({ email: value })
                    if (!employee) {
                        return true
                    } else {
                        throw new Error('email already exist in db')
                    }
                }
            }
        },
        mobile_No: {
            in:['body'],
            notEmpty: {
                errorMessage: "mobile is require"
            },
            isNumeric: {
                errorMessage: "mobile should be number"
            },
            isLength: {
                options: { min: 10, max: 10 },
                errorMessage: "password length should be 10"
            }
        },

        designation: {
            in:['body'],
            notEmpty: {
                errorMessage: "designation is require"
            },
            isIn: {
                options: [["HR", "Manager", "sales"]],
                errorMessage: "designation should be hr or manager of sales"
            },
        },
        gender: {
            in:['body'],
            notEmpty: {
                errorMessage: "gender is require"
            },
            isIn: {
                options: [["male", "female"]],
                errorMessage: "gender should be male or female"
            }
        },
        course: {
            in:['body'],
            notEmpty: {
                errorMessage: "course is require"
            },
        //     custom: {
        //         options: function (value) {
        //             if (!Array.isArray(value)) {
        //                 throw new Error("course should be array types")
        //             }
        //             if (value.length == 0) {
        //                 throw new Error("array must have more than 1 value")
        //             }
        //         }

        //     }
        },
    
     
    }
    module.exports=employeeValidation
		

