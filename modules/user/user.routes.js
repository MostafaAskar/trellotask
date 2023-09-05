import  express  from "express";
import { signIn, signUp ,verifyAccount,
    updateUser,
    deleteUser,
    changePassword,
    Logout
    } from "./user.controller.js";
import validation from "../../middleware/validation.js";
import { signUpSchema ,signInSchema} from "./user.validationSchema.js";

const userRoutes = express.Router();

userRoutes.post("/signUp",validation(signUpSchema),signUp)
userRoutes.post("/signIn",validation(signInSchema),signIn)
userRoutes.post("/Logout",Logout)
userRoutes.get("/verify/:id",verifyAccount)

//cahngePasswoed
userRoutes.patch("/changePassword", changePassword)
//update user 
userRoutes.patch("/updateUser", updateUser)
//delete user
userRoutes.delete("/deleteUser",deleteUser )




export default userRoutes;