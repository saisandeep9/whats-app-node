const express = require("express");
const app = express();
// const _ = require("lodash");

const bcrypt = require("bcrypt");
const config = require("config");

const { Driver } = require("../models/driver");

app.get("/drivers", async (req, res) => {
  const drivres = await Driver.find();
  res.send(drivres);
});

app.post("/drivers", async (req, res) => {
  const driver = new Driver({
    fristName: req.body.fristName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    mobileNumber: req.body.mobileNumber,
    isAdmin: req.body.isAdmin,
  });

  const salt = await bcrypt.genSalt(config.get("salt_to_password"));

  driver.password = await bcrypt.hash(req.body.password, salt);
  await driver.save();
  res.send(driver);
});

module.exports = app;
