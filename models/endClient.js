const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    unique: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports.Client = Client;
