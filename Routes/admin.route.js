import { Router } from "express";
import { Admin, Course } from "../Db/index.js";
import jwt from "jsonwebtoken";
import AdminAuth from "../Middleware/adminAuth.js";

const adminRouter = Router();
adminRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await Admin.create({
    username: username,
    password: password,
  });
  console.log("the control reaches here");
  res.send("User created successfully");
});

adminRouter.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(process.env.JWT_SECRET);
  const user = await Admin.findOne({
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
    res.send(token);
  } else {
    res.status(411).json({
      message: "Incorrect email or password",
    });
  }
});

adminRouter.post("/courses", AdminAuth, async (req, res) => {
  // TODO: Add validation with zod
  const title = req.body.title;
  const price = req.body.price;
  // TODO: Check if course already exists

  const course = await Course.create({
    title: title,
    price: price,
  });

  res.status(201).json({title: course.title, price: course.price});
});
export default adminRouter;
