const express = require("express");
const app = express();

const { Message } = require("../models/message");

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
module.exports = app;
