import userModel from "../../db/models/user.model.js"
import bcrypt from 'bcrypt'
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";





const signUp = async(req , res)=>{
    // console.log(req.body) 
    let {name ,email ,password ,age ,gender ,phone} = req.body ;
        let foundedUser = await userModel.findOne({email})
    if(foundedUser){
        res.json({message :"Already register"})
    }else{
        let hashPassword = bcrypt.hashSync(password,7)
       let addUser= await userModel.insertMany({userName:name , email,age,gender ,phone , password:  hashPassword});
       //TODO:
       sendEmail({email,id : addUser[0]._id});
       res.json({
        message  :"welcome",
        "addUser": addUser
       })
    

    }
    

}

const signIn = async (req , res)=>{
    let {email , password } = req.body ;
    let foundedUser = await userModel.findOne({email})
    // console.log(foundedUser);
        if(foundedUser){
            if(foundedUser.isVerified){
                let matchPassword = bcrypt.compareSync(password,foundedUser.password);
                if(matchPassword){
                    const token = jwt.sign({
                        userId: foundedUser._id,
                        userName :foundedUser.userName
                        }, 'your-secret-key', { expiresIn: '1d' });
                    if(token){
                        res.json({ message: "Login successful", token });
                    }else {
                        res.json({ message: "Error occurred while logging in" });
                    }
                    // res.json({message :"Welcome"})
                }else{
                    res.json({message :"wrong password"})
                }
            }else{
                res.json({message :"u need verify account"})
            
            }
            
        }else{
            res.json({message :"u need to register first"})
    }
}

const verifyAccount = async(req,res)=>{
    let {id} = req.params;
    let foundUser = await userModel.findById(id);
    if(foundUser){
        let updatedUser = await userModel.findByIdAndUpdate(id ,{isVerified :true},{new:true})
        res.json({message : "udated" , updatedUser})
    }else{
        res.json({message :"invalid id"})
    }

}

const changePassword =async function(req,res){
    let token = req.header("Authorization");
    try{
       let tokenData= jwt.verify(token ,'your-secret-key' );
       if(tokenData){
        
        let {email,password} = req.body;
        let foundedUser = await userModel.findOne({email})
        if(foundedUser){
            console.log(foundedUser._id)
            let hashPassword = bcrypt.hashSync(password,7)
            let UpdateUser = await userModel.findByIdAndUpdate(foundedUser._id,{password:hashPassword},{new:true})
            if(UpdateUser){
            res.json({message : "Update Success" ,UpdateUser})
            }else{
                res.json({message : "don't Success"})
            }
        }else {
            res.json({message : "User Not Found"})
        }
    }else{
        res.json({message : "You must login frist "})
    }
    }catch(err){
        res.json(err)
    }
    
    
    

}

const updateUser =async function(req,res){
   let token = req.header("Authorization");
        try{
            let tokenData= jwt.verify(token ,'your-secret-key' );
            if(tokenData){
                 let {userName,email} = req.body;
                 let foundeUser = await userModel.findOne({email})
                 // console.log(foundeUser);
                 if(foundeUser){
                     let UpdateUser = await userModel.findByIdAndUpdate(foundeUser._id,{userName:userName},{new:true})
                     if(UpdateUser){
                     res.json({message : "Update Success" ,UpdateUser})
                 }else{
                     res.json({message : "don't Success"})
                 }
                 }else{
                     res.json({message : "User Not Found"})
                 }
         }else{
             res.json({message : "You must loggin frist "})
         }
         }catch(err){
             res.json(err)
         }

    
}

const deleteUser =async function(req,res){
    let token = req.header("Authorization");
        try{
            let tokenData= jwt.verify(token ,'your-secret-key' );
            if(tokenData){
            let {email} = req.body;
            let foundeUser = await userModel.findOne({email})
            // console.log(foundeUser);
            if(foundeUser){
                let deleteUser = await userModel.findByIdAndDelete(foundeUser._id,{new:true})
                if(deleteUser){
                    res.json({message : "Deleted Success"})
            }else{
                res.json({message :"Wrong user id"})
            }
            }else{
                res.json({message : "User Not Found"})
            }
        }else{
            res.json({message : "You must loggin frist "})
        }
        }catch(err){
            res.json(err)
        }
    
}

const Logout = async function (req,res){
    let {email} = req.body ;
    let foundedUser = await userModel.findOne({email})
    const token = jwt.sign({
        userId: foundedUser._id,
        userName :foundedUser.userName
        }, 'your-secret-key', { expiresIn: '1s' });
    if(token){
        res.json({ message: "Logout successful", token });
    }else {
        res.json({ message: "Error occurred while loggoutin" });
    }
    

}





export{
    signUp,
    signIn,
    verifyAccount,
    updateUser,
    deleteUser,
    changePassword,
    Logout
    
}