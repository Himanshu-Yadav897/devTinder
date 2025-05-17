const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const { validateDataSignUp } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth.js");

app.use(cookieParser());
app.use(express.json());

// post api for post user data
app.post("/signup", async (req, res) => {
  try {
    // Validate the user
    validateDataSignUp(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Encrpyt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// post api for login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.getPassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, new Date(Date.now() + 8 * 3600000));

      res.send("Login Succesfull");
    } else {
      res.send("Login Unsuccessfull, Wrong Password");
    }
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// get api for profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = user;

    res.send(user);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// get user by email
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("Sent connection Request");
});

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Database connection Unsuccessful");
  });
