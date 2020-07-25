const express = require("express");
const app = express();

const { SentMessage } = require("../models/sentMessage");

// const { Driver } = require("../models/driver");
const { Message } = require("../models/message");
const { Client } = require("../models/endClient");
const { update } = require("lodash");

app.get("/sendMessage", async (req, res) => {
  const sentmessage = await SentMessage.find()
    .populate(`messageId`, "message -_id")
    .populate(`endClientId`);
  // .populate(`driverId`);

  res.send(sentmessage);
});

app.post("/sendMessage/:id", async (req, res, next) => {
  // await SentMessage.deleteMany();
  // const driver = await Driver.find();

  const mobileNumbers = await Client.find();

  const message = await Message.findById(req.params.id);
  if (!message)
    return res.status(404).send("The message with the given ID was not found.");

  let count = message.messageImport;
  mobileNumbers.map(async (mobilenumber) => {
    // driver.map(async (data) => {
    const sentmessage = new SentMessage({
      // driverId: data._id,
      messageId: message._id,
      endClientId: mobilenumber._id,
    });
    count = count + 1;
    await sentmessage.save();

    // });
  });
  // console.log(count);
  await Message.findByIdAndUpdate(req.params.id, { messageImport: count });

  res.status(200).send({ message: "success" });

  //   const sentmessage = new SentMessage({
  //     driverId: driver._id,
  //     // messageId:
  //   });
});

app.delete("/sendMessage/:id", async (req, res) => {
  const message = await SentMessage.findByIdAndRemove(req.params.id);

  if (!message)
    return res.status(404).send("The message with the given ID was not found.");

  res.send(message);
});

module.exports = app;
