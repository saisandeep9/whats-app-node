const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  fristName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobileNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  burnedMessages: {
    type: Number,
    default: 0,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fristName: this.fristName,
      isAdmin: this.isAdmin,
      burnedMessages: this.burnedMessages,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", userSchema);
module.exports.User = User;
