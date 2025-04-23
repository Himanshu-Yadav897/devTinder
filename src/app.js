const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Himanshu",
    lastName: "Yadav",
    emailId: "hy897433Gmail.com",
    password: "Himanshu@123",
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.send("Error while saving the data :" + err.message);
  }
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
