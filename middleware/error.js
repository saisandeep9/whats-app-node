const winston = require("winston");

function error(err, req, res, next) {
  // winston.error(err.message, err);
  res.status(500).send({ error: "An error occurred", err });
  // res.status(404).send({ error: "Invalid category is provided" });
}

module.exports = error;
