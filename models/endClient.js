const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
