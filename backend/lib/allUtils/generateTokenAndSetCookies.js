const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_JWT, {
    expiresIn: "10d",
  });

  // res.cookie("jwt", token, {
  //   maxAge: 10 * 24 * 60 * 60 * 1000, //in MS
  // });

  res.cookie("jwt", token, {
    httpOnly: true, // 🔥 Prevents client-side JS from accessing it
    secure: process.env.NODE_ENV === "production", //  Secure in production (HTTPS)
    sameSite: "lax", // Ensures cookie is sent in normal requests
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });
};

module.exports = generateTokenAndSetCookie;
