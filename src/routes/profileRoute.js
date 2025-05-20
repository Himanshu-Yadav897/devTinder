const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth.js");
const { validateDataEdit } = require("../utils/validation.js");

// get api for profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Patch api for edit details
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isAllowed = validateDataEdit(req);
    if (!isAllowed) {
      throw new Error(
        "Input fields are wrong , that's why , we can't edit the user data"
      );
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    user.save();

    res.json({
      message: `${user.firstName} your data has been updated`,
      data: user,
    });
  } catch (err) {
    res.send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    const isPasswordValid = await user.getPassword(currentPassword);

    if (!isPasswordValid) {
      throw new Error("Your current password is wrong");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();
    res.send("Your Password updated succesfully");
  } catch (err) {
    res.send("Error : " + err.message);
  }
});

module.exports = profileRouter;
