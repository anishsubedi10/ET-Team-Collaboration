const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

//if we need data of different user for same user we can use getme
const userprofile = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in user profile:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { fullName, email, currentPassword, newPassword } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not Found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch)
        return res.status(400).json({ error: "Current password is incorrect" });

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      user.email = email || user.email;
    }

    user.fullName = fullName || user.fullName;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { userprofile, updateUser };
