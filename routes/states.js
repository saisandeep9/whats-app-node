const express = require("express");
const app = express();

const { States } = require("../models/states");

app.get("/states", async (req, res) => {
  const states = await States.find();

  res.send(states);
});

app.post("/states", async (req, res) => {
  const state = new States({ stateName: req.body.stateName });

  await state.save();
  res.send(state);
});

app.delete("states/:id", async (req, res) => {
  const state = await States.findByIdAndRemove(req.params.id);

  if (!state)
    return res.status(404).send("The state with the given ID was not found.");

  res.send(state);
});

module.exports = app;
