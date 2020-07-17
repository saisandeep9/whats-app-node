const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(cors(corsOptions));
app.use(express.json());

const drivers = require("./routes/drivers");
const clients = require("./routes/endClients");
const test = require("./routes/test");

mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host ${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

app.use("/api", drivers);
app.use("/api", clients);
app.use("/api", test);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
