const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("/");
});

app.get("/hello/2", (req, res) => {
  res.send("/hello/2");
});

app.post("/hello/2", (req, res) => {
  res.send("Data Fetched Successfully");
});
app.listen(7777, () => {
  console.log("it's Running1");
});
