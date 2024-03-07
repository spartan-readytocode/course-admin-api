import { Router } from "express";
const studentRouter = Router()
import { studentSchema } from "../Zod/student.zod.js";
import { User } from "../Db/index.js";
import { Course } from "../Db/index.js";

studentRouter.post('/signup',async(req,res)=>{
    const studentValidator = studentSchema.safeParse(req.body);
    if(!studentValidator.success){
        return res.status(401).send('The zod validation failed')
    }
    const {username, password} = studentValidator.data;
    const ExistingUser = await User.findOne({
        username: username, 
        password : password,
    })
    if(!ExistingUser){
        await User.create({
            username:username,
            password: password
        })
    }
    else{
        res.send("The Student already exists")
    }
})
export default studentRouter;