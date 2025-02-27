const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No Token available" });
    }
    const decode = jwt.verify(token, process.env.SECRET_JWT);
    if (!decode) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // console.log("From decode");

    // console.log(decode);

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in ProtectRoute middleware", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = protectRoute;
