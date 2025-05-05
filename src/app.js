const express = require("express");
const User = require("./models/user.js");
const connectDB = require("./config/database.js");
const app = express();

app.use(express.json());

// post api for post user data
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.send("Error while saving the data :" + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userMail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userMail });
    if (!user) {
      res.status(404).send("Something went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});

//Feed API -> get all the user/data by email
app.get("/feed", async (req, res) => {
  const userMail = req.body.emailId;

  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Delete Api for findByIdAndDelete
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });

    res.send("User deleted successfully" + user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// FindByID and Update using PATCH
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated Succesfully " + user);
  } catch (err) {
    res.status(404).send("Something went wrong" + err);
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
