const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const driverSchema = new mongoose.Schema({
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
  },
  mobileNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, fristName: this.fristName, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Driver = mongoose.model("Drivers", driverSchema);
module.exports.Driver = Driver;
