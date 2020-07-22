const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
