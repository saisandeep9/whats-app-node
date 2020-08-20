const express = require("express");
const app = express();

const { Client } = require("../models/endClient");
const upload = require("../middleware/upload");
const excelToJson = require("convert-excel-to-json");
const ImportExceltoMDB = require("../middleware/importtoDB");

global.__basedir = __dirname;

app.post(
  "/clients",
  upload.single(`file`),

  async (req, res) => {
    // console.log(req.body.file);
    const file = req.body.file;

    // console.log("file name", __basedir + "/uploads/" + req.file.filename);

    const data = ImportExceltoMDB(req.file.path);

    data.map(async (d) => {
      console.log("data", d);
      let mobileNumber = Client.findOne({
        mobileNumber: parseInt(`91${d.mobileNumber}`),
      });
      let db;
      if (mobileNumber) res.status(400).send("number already ");
      db = new Client({ mobileNumber: parseInt(`91${d.mobileNumber}`) });
      // const db = new Client({ mobileNumber: parseInt(`91${d.mobileNumber}`) });
      // const db = new Client({ mobileNumber: d.mobileNumber });

      await db.save();
    });

    res.status(200).send({ message: "success" });
  }
);

app.get("/clients", async (req, res) => {
  const client = await Client.find();

  res.send(client);
});

app.get("/clients/count", async (req, res) => {
  const mobileNumberCount = await Client.find().count();

  res.send({ mobileNumberCount });
});

module.exports = app;
