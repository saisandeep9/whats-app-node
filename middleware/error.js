const winston = require("winston");

function error(err, req, res, next) {
  // winston.error(err.message, err);
  res.status(404).send({ error: "Invalid Url" });
  res.status(500).send({ error: "An error occurred", err });
}

module.exports = error;
