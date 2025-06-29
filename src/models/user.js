const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator(value) {
          if (!validator.isEmail(value)) {
            throw new Error("This is wrong Email :- " + value);
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          if (!validator.isStrongPassword(value)) {
            throw new Error(
              "This is weak Password, Enter a Strong Password :- " + value
            );
          }
        },
      },
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is incorrect gender type",
      },
    },
    photoUrl: {
      type: String,
      default: "data:image/jpeg;base64,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",
    },
    about: {
      type: String,
      default: "This is a default about of a user",
    },
    skills: {
      type: [String],
      default: ["JavaScript"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.getPassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
