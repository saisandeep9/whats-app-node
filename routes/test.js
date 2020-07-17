const express = require("express");
const app = express();
const test = require("../middleware/testmid");
const mylg = require("../middleware/test2");
// var myLogger = function (req, res, next) {
//   console.log(" from my logg fun n rout LOGGED");
//   next();
// };

// app.use(myLogger);

app.get("/a", mylg, test, async (req, res) => {
  console.log(req.u);
  res.send("this from test routers");
});

module.exports = app;
