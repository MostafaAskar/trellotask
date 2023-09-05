import taskModel from "../../db/models/task.model.js"
import userModel from "../../db/models/user.model.js"
import jwt from "jsonwebtoken";
// import sendEmail from "../../utils/sendEmail.js";




const createtask = async(req , res)=>{
    let token = req.header("Authorization");
    try{
        let tokenData= jwt.verify(token ,'your-secret-key' );
        if(tokenData){
            let {title , description ,email,status,deadline} = req.body ;
            let foundedUser = await userModel.findOne({email})
            if(foundedUser){
            let foundedtask = await taskModel.findOne({title})
            if(foundedtask){
                res.json({task :"Already tasked"})

            }else {
            let addtask= await taskModel.insertMany({ title,description, status,deadline,userId:foundedUser._id,assignTo:foundedUser._id});
            res.json({
                task  :"welcome",
                "addtask": addtask
            })
                }
            }else{
                res.json({task :"Not Founded User "})
            }
    }else{
        res.json({message : "You must loggin frist "})
    }
    }catch(err){
        res.json(err)
    }    

}


const getAlltask= async function(req,res){
    let tasks = await taskModel.find({}).populate("userId")
    res.json({task :"All tasks --->" ,tasks})
    
}

const gettasksafterdeadline = async function(req,res){
    let currentDate = new Date();
    let tasks = await taskModel.find({
        status : {$eq : "done"},
        deadline: { $lt: currentDate }
    })
    if(tasks.length > 0){
        res.json({task :"All tasks --->" ,tasks})
    }else {
        res.json({task :" There are no expired tasks --->" })
    }

}

const updatetask =async function(req,res){
    let token = req.header("Authorization");
    try{
        let tokenData= jwt.verify(token ,'your-secret-key' );
        if(tokenData){
            let {email,title , description ,status} = req.body ;
            let foundeUser = await userModel.findOne({email})
            // console.log(foundeUser);
            if(foundeUser){
                let findtask = await taskModel.findOne({userId:foundeUser._id})
                // console.log(findtask)
                if(findtask){
                    let updateUser = await taskModel.findByIdAndUpdate(findtask._id,{title , description ,status},{new:true})
                    console.log(updateUser)
                    if(updateUser){
                        res.json({task : "Update Success"})
                    }else{
                        res.json({task :"Update wrong"})
                    }
                }else{
                    res.json({task :"Not Founded task"})
                }
            }else{
                res.json({task :"Wrong user email"})
            }
    }else{
        res.json({message : "You must loggin frist "})
    }
    }catch(err){
        res.json(err)
    }    


    ///
    

}

const deletetask =async function(req,res){
    let token = req.header("Authorization");
    try{
        let tokenData= jwt.verify(token ,'your-secret-key' );
        if(tokenData){
            let {email} = req.body;
            let foundeUser = await userModel.findOne({email});

            if(foundeUser){
                let findtask = await taskModel.findOne({userId:foundeUser._id});
                if(findtask){
                    let deleteUser = await taskModel.findByIdAndDelete(findtask._id,{new:true})
                    if(deleteUser){
                        res.json({task : "Deleted Success"})
                    }else{
                        res.json({task :"Deleted wrong"})
                    }
                }else{
                    res.json({task :"Not Founded task"})
                }
            }else{
                res.json({task :"Wrong user email"})
            }
            }else{
                res.json({message : "You must loggin frist "})
            }
            }catch(err){
                res.json(err)
            }    
}







export{
    createtask,
    getAlltask,
    deletetask,
    updatetask,
    gettasksafterdeadline
}