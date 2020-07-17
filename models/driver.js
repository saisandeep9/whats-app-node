const mongoose = require("mongoose");

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
});

const Driver = mongoose.model("Drivers", driverSchema);
module.exports.Driver = Driver;
