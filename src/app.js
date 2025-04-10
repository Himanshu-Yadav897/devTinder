const express = require("express");

const app = express();
const auth = require("./middlewares/auth.js"); 

app.use("/admin", auth); 

app.get("/admin/getAllData", (req, res) => {
  res.send("Get all the books");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("Deleted all the books");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
