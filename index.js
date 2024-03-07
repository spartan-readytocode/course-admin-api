import "dotenv/config.js";
import express from "express";

import ConnectDb from "./Db/index.js";
import adminRouter from "./Routes/admin.route.js";

ConnectDb()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use("/admin", adminRouter);

    const port = 3000;
    app.listen(port, () => {
      console.log("App listening at port 3000");
    });
  })
  .catch(() => {
    console.log("DB Connection Failed");
  });
