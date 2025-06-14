import dotenv from "dotenv";
dotenv.config();
export const ENV_VARS = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
