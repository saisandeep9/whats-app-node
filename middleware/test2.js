// var myLogger =

function myLogger(req, res, next) {
  res.u("this test2");

  console.log(" from my logg fun n mid test2 LOGGED");

  next();
}

module.exports = myLogger;
