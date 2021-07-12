require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const database = require("./knexfile").development;
const knex = require("knex")(database);
const port = 8080;
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

// import routes and service class
const PlatformRouter = require("./Router/platformRouter");
const Method = require("./Service/ServiceClass");

let method = new Method(knex);
let platformRouter = new PlatformRouter(method);

app.use("/", platformRouter.router());

// Serve app
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
