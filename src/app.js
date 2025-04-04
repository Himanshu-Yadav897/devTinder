const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res,next) => {
    // res.send("response");
    next();
  },
  (req, res) => {
    res.send("response 2");
  }
);
app.listen(7777, () => {
  console.log("it's Running1");
});
