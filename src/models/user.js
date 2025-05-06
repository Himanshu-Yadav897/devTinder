const mongoose = require("mongoose");
const validator = require("validator");

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
        validator(value){
          if(!validator.isEmail(value)){
            throw new Error("This is wrong Email :- " + value);
          }
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("This is weak Password, Enter a Strong Password :- " + value);
          }
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default : "https://pngtree.com/freepng/user-vector-avatar_4830521.html",
      validate : {
        validator(value){
          if(!validator.isURL(value)){
            throw new Error("Invalid URL");
          }
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of a user",
    },
    skills: {
      type: [String],
      default : ["JavaScript"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
