import joi from "joi"


const signUpSchema = joi.object({
    name : joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password : joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
    age : joi.number().min(15).max(55),
    gender :joi.string().min(4).max(6).required(), 
    phone : joi.string().min(11).max(11).required(),
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password : joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
})


export {
    signUpSchema,
    signInSchema,
    
}