import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { connectDB } from "./config/db.js";

import { ENV_VARS } from "./config/envVars.js";
import { protectRoute } from "./middleware/protectRoute.js";
const app = express();
const PORT = ENV_VARS.PORT;

// middlware
// app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
