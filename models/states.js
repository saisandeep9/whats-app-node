const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: true,
    trim: true,
  },
});

const States = mongoose.model("State", stateSchema);
module.exports.States = States;
