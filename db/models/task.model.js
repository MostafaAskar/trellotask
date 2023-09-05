import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    title : String,
    description : String,
    status: {
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default: 'toDo'
      },
    userId:{
        type : mongoose.Types.ObjectId,
        ref :"User"
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      deadline:  Date,
},{timestamps:true});

const taskModel = mongoose.model("task" , taskSchema);
export default taskModel;