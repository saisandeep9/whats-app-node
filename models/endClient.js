const mongoose = require("mongoose");
const Joi = require("joi");

const clientSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model("Client", clientSchema);

function validate(client) {
  const schema = {
    mobileNumber: Joi.number(),
  };
  return Joi.validate(client, schema);
}

module.exports.Client = Client;
module.exports.validate = validate;
