import mongoose from "mongoose";
const MongoURL= "mongodb+srv://awais:19ntu1151@todo-app.nsjx3hg.mongodb.net/GroceryApp";

const ConnectToDb=async()=>{
    await mongoose.connect(MongoURL)
    console.log("MongoDB is Connected")
}
export default ConnectToDb;