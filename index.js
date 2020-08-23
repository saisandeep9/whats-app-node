const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const helmet = require("helmet");
var http = require("http").createServer(app);
// var io = require("socket.io")();
const io = require("socket.io")(http);
const winston = require("winston");

// winston.add(winston.transports.File, { filename: "logfile.log" });

// process.on("uncaughtException", (ex) => {
//   // console.log("we got an uncaught exception");

//   winston.error(ex.message);
//   // process.exit(1);
// });
// winston.exceptions.handleExceptions(
//   new winston.transports.File({ filename: "uncaughtExceptions.log" })
// );

process.on("unhandledRejection", (ex) => {
  throw ex;
  // winston.error(ex.message);
  // process.exit(1);
});

const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.set("socketio", io);
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
require("express-async-errors");

const users = require("./routes/uers");
const clients = require("./routes/endClients");
const message = require("./routes/messages");
const states = require("./routes/states");
const auth = require("./routes/auth");
require("./startup/validation")();

const sentMessage = require("./routes/sentMessage");
const error = require("./middleware/error");
// throw new Error("something from index");
// const p = Promise.reject(new Error("something from index"));

// const winston = require("winston/lib/winston/config");
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
app.use("/api", states);
app.use("/api", sentMessage);

app.use(error);

// app.use("/api", test);

// const io = socketIo(server);
let interval;

io.on("connection", (socket) => {
  console.log("a user connected 1");
  // console.log("interval0", interval);
  // if (interval) {
  //   clearInterval(interval);
  // }
  interval = setInterval(() => getApiAndEmit(socket), 10000, console.log("1"));
  // console.log("interval", interval);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();

  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

const port = process.env.PORT || 3900;
const server = http.listen(port, () =>
  console.log(`listening to port ${port}`)
);

module.exports = server;
