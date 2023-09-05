import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : String,
    email:String,
    password:String,
    age:Number,
    gender : String,
    phone : String,
    isVerified :{
        type: Boolean,
        default:false
    },
},{timestamps:true});

const userModel = mongoose.model("User" , userSchema)

export default userModel; 