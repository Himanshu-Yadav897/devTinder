const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("35 10 * * *", async () => {
  const yesterday = subDays(new Date(), 0);
  const startTime = startOfDay(yesterday);
  const endTime = endOfDay(yesterday);

  try {
    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: startTime,
        $lt: endTime,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (let email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "New Friend Request pending for " + email,
          "There are so many friend request pending , please login to MatchFixing.xyz and review these requests"
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
