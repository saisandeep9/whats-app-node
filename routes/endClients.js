const express = require("express");
const app = express();
// const _ = require("lodash");

const { Client } = require("../models/endClient");
const upload = require("../middleware/upload");
const excelToJson = require("convert-excel-to-json");
const ImportExceltoMDB = require("../middleware/importtoDB");
// const mdb = require("../middleware/importtoDB");
global.__basedir = __dirname;

app.post(
  "/clients",
  upload.single(`file`),

  async (req, res) => {
    console.log(req.body.file);
    const file = req.body.file;
    // const file = req.file.filename;

    console.log("img ", req.file.path);
    // console.log("my file", req.file.filename);
    // console.log("file", req.file.filename);
    console.log("file name", __basedir + "/uploads/" + req.file.filename);

    // const data = ImportExceltoMDB(__basedir + "/uploads/" + req.file.filename);
    const data = ImportExceltoMDB(req.file.path);
    // console.log(__basedir);

    // console.log("samle data", data);

    data.map(async (d) => {
      const db = new Client({ mobileNumber: parseInt(`91${d.mobileNumber}`) });

      await db.save();
    });

    res.status(200).send({ message: "success" });
  }
);

app.get("/clients", async (req, res) => {
  const client = await Client.find();

  res.send(client);
});

module.exports = app;
