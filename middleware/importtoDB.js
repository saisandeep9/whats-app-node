const excelToJson = require("convert-excel-to-json");
const { Client } = require("../models/endClient");

global.__basedir = __dirname;

function ImportExceltoMDB(filePath, req, res, next) {
  // __basedir + "/uploads/" + req.file.filename;
  // -> Read Excel File to Json Data

  console.log("im fun", __basedir);
  console.log("filepath", filePath);

  const exlData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: "Sheet1",
        // Header Row -> be skipped and will not be present at our result object.
        // header: {
        //   rows: 1,
        // },
        // Mapping columns to keys
        columnToKey: {
          A: "mobileNumber",
        },
      },
    ],
  });
  return exlData.Sheet1;
  // res.send(exlData.Sheet1);

  // console.log((s = exlData.Sheet1[0]));
  //   exlData.Sheet1.map((t) => ((p = new Client(t)), p.save()));

  // const client = new Client(s);
  // s.save();
}

module.exports = ImportExceltoMDB;
