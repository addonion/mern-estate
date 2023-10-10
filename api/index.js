import "dotenv/config";
import expres from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => console.log(err));

const app = expres();

app.listen(3000, () => {
  console.log(`Server on 3000 port`);
});

app.use("/api/user", userRoute);
