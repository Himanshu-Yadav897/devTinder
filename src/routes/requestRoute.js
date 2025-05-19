const express = require("express");

const requestRouter = express.Router();
const userAuth = require("../middlewares/auth.js");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("Sent connection Request");
});

module.exports = requestRouter;