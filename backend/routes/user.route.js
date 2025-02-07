const express = require("express");
const protectRoute = require("../middleware/protecteRoute");
const { userprofile, updateUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile", protectRoute, userprofile);
router.post("/update", protectRoute, updateUser);

module.exports = router;
