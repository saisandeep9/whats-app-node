const express = require("express");
const app = express();
// const _ = require("lodash");

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
    mobileNumber: req.body.mobileNumbe,
  });
  await driver.save();
  res.send(driver);
});

module.exports = app;
