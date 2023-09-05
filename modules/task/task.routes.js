import  express  from "express";
import { createtask,getAlltask,deletetask,updatetask,gettasksafterdeadline} from "./task.controller.js";
import validation from "../../middleware/validation.js";
import { taskSchema } from "./task.validationSchema.js";

const taskRoutes = express.Router();

taskRoutes.post("/createtask",validation(taskSchema),createtask)
taskRoutes.get("/tasks", getAlltask)
taskRoutes.delete("/deletetask",deletetask )
taskRoutes.patch("/updatetask", updatetask)
taskRoutes.get("/tasksAfterDeadline", gettasksafterdeadline)







export default taskRoutes;