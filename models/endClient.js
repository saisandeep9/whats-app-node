const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    unique: true,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
