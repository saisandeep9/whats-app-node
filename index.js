const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const helmet = require("helmet");

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
require("express-async-errors");

const users = require("./routes/uers");
const clients = require("./routes/endClients");
const message = require("./routes/messages");
const auth = require("./routes/auth");
const sentMessage = require("./routes/sentMessage");
const error = require("./middleware/error");
// const test = require("./routes/test");

mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host ${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

app.use("/api", users);
app.use("/api", clients);
app.use("/api", message);
app.use("/api", auth);
app.use("/api", sentMessage);
app.use(error);

// app.use("/api", test);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
