import express from "express";
// import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
const app = express();
const PORT = ENV_VARS.PORT;

// middlware
// app.use(cors());
dotenv.config();
app.use(express.json());

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer" + ENV_VARS.TMDB_API_KEY,
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
// routes
app.use("/api/v1/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
