const express = require("express");
const app = express();
// const _ = require("lodash");

const bcrypt = require("bcrypt");
const config = require("config");

const { User } = require("../models/user");

app.get("/users", async (req, res) => {
  const users = await User.find();
  // const count = await Driver.find().count();

  // // console.log(res.);
  // res.writeHead({ count: count });
  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.fristName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    mobileNumber: req.body.mobileNumber,
    isAdmin: req.body.isAdmin,
  });

  const salt = await bcrypt.genSalt(config.get("salt_to_password"));

  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  user = await User.findById(req.params.id);

  let count = user.burnedMessages;

  user = await User.findByIdAndUpdate(req.params.id, {
    burnedMessages: count + 1,
  });

  res.status(200).send({ message: "success" });
});

module.exports = app;
