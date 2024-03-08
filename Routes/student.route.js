import { Router } from "express";
const studentRouter = Router();
import { studentSchema } from "../Zod/student.zod.js";
import { User } from "../Db/index.js";
import { Course } from "../Db/index.js";
import jwt from 'jsonwebtoken'
import studentAuth from "../Middleware/studentAuth.js";

studentRouter.post("/signup", async (req, res) => {
  const studentValidator = studentSchema.safeParse(req.body);
  if (!studentValidator.success) {
    return res.status(401).send("The zod validation failed");
  }
  const { username, password } = studentValidator.data;
  const ExistingUser = await User.findOne({
    username: username,
    password: password,
  });
  if (!ExistingUser) {
    await User.create({
      username: username,
      password: password,
    });
  } else {
    res.send("The Student already exists");
  }
});

studentRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    username: username,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_SECRET
    );
    return res.json({
        token : token,
        username : user.username
    })
  }
  else {
    res.status(411).json({
      message: "Incorrect email or password",
    });
  }
});

studentRouter.post('/course/:courseId', studentAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.decode(token, process.env.JWT_SECRET);
    const username = data.username;
    console.log("control reached here");
  
    try {
        await User.updateOne({
            username: username
        }, {
          "$push":{
              purchasedCourse:courseId
          } 
        })
        res.json({
            message: "Purchase complete!"
        })
    
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating course purchase" });
    }
  });
  

  studentRouter.get('/course', studentAuth, async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            username: data.username
        });

        console.log(user.purchasedCourse); 
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourse
            }
        });

        res.json({
            "courses": courses
        });
    } catch (error) {
        console.error("Error fetching user's purchased courses:", error);
        res.status(500).json({ message: "Error fetching user's purchased courses" });
    }
});

export default studentRouter;
