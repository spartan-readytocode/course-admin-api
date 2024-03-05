import mongoose from "mongoose";
const ConnectDb = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Database connected Successfully")
    }catch(err){
        console.log("Failed to connect with the database");
        console.error(err)
    }
}


const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
})
const UserSchema = new mongoose.Schema({
    username: username,
    password : password,
    purchasedCourse : [{
        type: mongoose.Schema.ObjectId,
        ref:"Course"
    }]
})
const CourseSchema = mongoose.Schema({
    title : String,
    price : Number, 
    
})
const Admin = mongoose.model('Admin',AdminSchema)
const User = mongoose.model('User',UserSchema)
const Course = mongoose.model('Course',CourseSchema)
export {Admin,User,Course}

export default ConnectDb