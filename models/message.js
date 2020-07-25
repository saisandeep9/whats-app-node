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
  messageImport: {
    type: Number,
    trim: true,
    default: 0,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports.Message = Message;
