import express from "express";
// import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
const app = express();
const PORT = ENV_VARS.PORT;

// middlware
// app.use(cors());
dotenv.config();
app.use(express.json());
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
