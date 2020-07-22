const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Message = mongoose.model("Messages", messageSchema);
module.exports.Message = Message;
