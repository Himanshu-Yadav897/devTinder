const express = require("express");
const ConnectionRequestModel = require("../models/connectionRequest.js");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth.js");
const User = require("../models/user.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // status type validation
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status type is wrong");
      }

      // If user is not in DB validation
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User is not in DB");
      }

      // if there is an existing connection validation
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection Request is already exists");
      }

      const connectionRequestModel = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestModel.save();
      res.json({
        message: "Send Request is saved to db",
        data,
      });
    } catch (err) {
      res.send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter;
