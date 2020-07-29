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
      console.log({ mobileNumbre: `91${d.mobileNumber}` });
      console.log({ mobileNumbre: parseInt(`91${d.mobileNumber}`) });
      const db = new Client({ mobileNumber: parseInt(`91${d.mobileNumber}`) });

      await db.save();
    });

    res.status(200).send({ message: "success" });
    // exlData.Sheet1.map((t) => ((p = new Client(t)), p.save()));

    // const client = new Client({
    //   code: req.body.code,
    //   mobileNumber: req.body.mobileNumber,
    // });

    // await client.save();
    // res.send(client);
  }
);

// function ImportExceltoMDB(filePath) {
//   // -> Read Excel File to Json Data
//   const exlData = excelToJson({
//     sourceFile: filePath,
//     sheets: [
//       {
//         // Excel Sheet Name
//         name: "Sheet1",
//         // Header Row -> be skipped and will not be present at our result object.
//         header: {
//           rows: 1,
//         },
//         // Mapping columns to keys
//         columnToKey: {
//           A: "code",
//           B: "mobileNumber",
//         },
//       },
//     ],
//   });

//   // console.log((s = exlData.Sheet1[0]));
//   exlData.Sheet1.map((t) => ((p = new Client(t)), p.save()));

//   // const client = new Client(s);
//   // s.save();
// }

app.get("/clients", async (req, res) => {
  const client = await Client.find();

  res.send(client);
});

module.exports = app;
