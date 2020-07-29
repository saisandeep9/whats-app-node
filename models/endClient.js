const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
