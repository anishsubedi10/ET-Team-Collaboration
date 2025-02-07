const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const generateTokenAndSetCookie = require("../lib/allUtils/generateTokenAndSetCookies");

const signup = async (req, res) => {
  try {
    // const { username, fullName, email, password } = req.body;
    const { fullName, email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).json({ error: "Username is already taken" });
    // }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      // username,
      fullName,
      email,
      password: hashPassword,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        // username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // const { username, password } = req.body;

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const checkPasseord = await bcrypt.compare(password, user?.password || "");

    if (!user || !checkPasseord) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getme controller error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout, getme };
