const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sentmessageSchema = new mongoose.Schema({
  messageId: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  },
  endClientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  // driverId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Drivers",
  //   required: true,
  // },
});

const SentMessage = mongoose.model("SentMessages", sentmessageSchema);
module.exports.SentMessage = SentMessage;
