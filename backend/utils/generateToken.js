import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: ENV_VARS.JWT_EXPIRE,
  });

  res.cookie("jwt-netflix", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development",
  });

  return token;
};
