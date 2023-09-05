import mongoose from "mongoose";

function connection(){
    mongoose.connect("mongodb://127.0.0.1:27017/TrelloTask")
    .then(()=>console.log("DB connect"))
    .catch((err)=>console.log(`db error =>${err}`))
}
export default connection;
