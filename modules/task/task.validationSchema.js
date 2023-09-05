import joi from "joi"


const taskSchema = joi.object({
    email: joi.string().email().required(),
    title : joi.string().min(3).max(15).required(),
    description: joi.string().min(3).max(50).required(),
    status: joi.string(),
    deadline: joi.date(),

    
})

// const contentSchema = joi.object({
//     title : joi.string().min(3).max(15).required(),
//     content: joi.string().min(3).max(30).required(),
// })


export {
    taskSchema
    
}