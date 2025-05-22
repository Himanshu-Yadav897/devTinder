const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute.js");
const profileRouter = require("./routes/profileRoute.js");
const requestRouter = require("./routes/requestRoute.js");
const userRouter = require("./routes/userRoute.js");


app.use(cookieParser());
app.use(express.json());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);






// get user by email


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
