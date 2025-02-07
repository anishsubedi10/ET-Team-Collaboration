const express = require("express");

const {
  signup,
  login,
  logout,
  getme,
} = require("../controllers/auth.controller");
const protectRoute = require("../middleware/protecteRoute");

const router = express.Router();

router.get("/getme", protectRoute, getme);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
