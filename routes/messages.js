const express = require("express");
const app = express();

const { Message } = require("../models/message");
const { SentMessage } = require("../models/sentMessage");

app.post("/message", async (req, res) => {
  const message = new Message({
    subject: req.body.subject,
    message: req.body.message,
  });

  await message.save();

  res.send(message);
});

app.get("/message", async (req, res) => {
  const message = await Message.find();
  res.send(message);
});

app.delete("/message/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid user id");

  const message = await Message.findByIdAndRemove(req.params.id);
  if (!message) return res.status(404).send("The message was not found.");

  await SentMessage.deleteMany({ messageId: req.params.id });
  res.send(message);
});

module.exports = app;
