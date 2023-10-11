import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server on 3000 port`);
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
