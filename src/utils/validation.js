const validator = require("validator");


const validateDataSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("You have not entered the nam,e correctly");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("You have not entered the email correctly");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("You have not entered the strong Password");
  }
};

const validateDataEdit = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowed;
};

module.exports = {
  validateDataSignUp,
  validateDataEdit
};
