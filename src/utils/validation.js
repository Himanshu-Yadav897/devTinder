const validator = require("validator");

const validateDataSignUp = (req) => {
  const {firstName, lastName, emailId, password} = req.body;

  if (!firstName || !lastName) {
    throw new Error("You have not entered the nam,e correctly");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("You have not entered the email correctly");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("You have not entered the strong Password");
  }
};

module.exports = {
  validateDataSignUp,
};
