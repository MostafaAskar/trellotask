import express ,{json} from 'express';
import connection from './db/connection.js';
import userRoutes from './modules/user/user.routes.js';
import taskRoutes from './modules/task/task.routes.js';


const app = express();

connection();
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)




app.listen(8080)
// app.listen(port , ()=> console.log(`Example app listening on port ${port}!`))
