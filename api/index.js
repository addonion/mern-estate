import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("\x1b[42m", "MONGODB connected", "\x1b[0m"))
  .catch((err) => console.log(err));

const app = express();

// Включаем json
app.use(express.json());

// Поднимаем сервер на порту
app.listen(3000, () => {
  console.log("\x1b[42m", `Server on 3000 port`, "\x1b[0m");
});

// Наши роуты для API
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

// Middleware
app.use((err, req, res, nexxt) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Initial Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
