require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./knexfile").development;
const knex = require("knex")(database);
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const socketio = require("./socketio")(io);

// import routes and service class
const PlatformRouter = require("./Router/platformRouter");
const Method = require("./Service/ServiceClass");

let method = new Method(knex);
let platformRouter = new PlatformRouter(method);

app.use("/", platformRouter.router());

// Serve app
http.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
