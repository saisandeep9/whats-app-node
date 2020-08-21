const express = require("express");
const app = express();
const auth = require("../middleware/auth");

const { SentMessage } = require("../models/sentMessage");

const { Message } = require("../models/message");
const { Client } = require("../models/endClient");

app.get("/sendMessage", auth, async (req, res) => {
  // console.log("this send message");
  const sentmessage = await SentMessage.find()
    .populate(`messageId`, "message -_id")
    .populate(`endClientId`)
    .limit(10);

  let io = req.app.get("socketio");

  io.emit("ts", sentmessage);
  res.send(sentmessage);
});

app.get("/sendMessage/messagecount", async (req, res) => {
  const messageCount = await SentMessage.find().countDocuments();

  // res.send(status);
  res.send({ messageCount });
});

app.post("/sendMessage/:id", async (req, res, next) => {
  const mobileNumbers = await Client.find();

  const message = await Message.findById(req.params.id);
  if (!message)
    return res.status(404).send("The message with the given ID was not found.");

  let count = message.messageImport;
  mobileNumbers.map(async (mobilenumber) => {
    const sentmessage = new SentMessage({
      messageId: message._id,
      endClientId: mobilenumber._id,
    });
    count = count + 1;
    await sentmessage.save();
  });

  await Message.findByIdAndUpdate(req.params.id, { messageImport: count });

  res.status(200).send({ message: "success" });
});

app.delete("/sendMessage/:id", async (req, res) => {
  // console.log("send message", req.params.id);

  const message = await SentMessage.findByIdAndRemove(req.params.id);

  if (!message)
    return res.status(404).send("The message with the given ID was not found.");

  res.send(message);
});

module.exports = app;
