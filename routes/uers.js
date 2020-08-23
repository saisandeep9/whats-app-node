const express = require("express");
const app = express();
// const _ = require("lodash");

const bcrypt = require("bcrypt");
const config = require("config");

const { User } = require("../models/user");
const mongoose = require("mongoose");

app.get("/users", async (req, res) => {
  // throw new Error("could not get the users")
  const users = await User.find();
  // const count = await Driver.find().count();

  // // console.log(res.);
  // res.writeHead({ count: count });
  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid user id");
  user = await User.findById(req.params.id);

  if (!user) return res.send("No User with this ID");

  let count = user.burnedMessages;

  user = await User.findByIdAndUpdate(req.params.id, {
    burnedMessages: count + 1,
  });

  res.status(200).send({ message: "success" });
});

module.exports = app;
