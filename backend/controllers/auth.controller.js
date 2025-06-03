import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //   validating inputs
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //   hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //   profile
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    // create new user
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
      image,
    });
    //   GENERATE TOKEN

    const token = generateTokenAndSetCookie(newUser._id, res);
    // save user
    await newUser.save();
    return res.status(201).json({
      ...newUser._doc,
      password: "",
      token: token,
      message: "User created successfully",
    });
  } catch (error) {}
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      ...user._doc,
      password: "",
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error in login middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
