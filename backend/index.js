require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./knexfile").development;
const knex = require("knex")(database);
const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// import routes and service class
const PlatformRouter = require("./Router/platformRouter");
const Method = require("./Service/ServiceClass");

let method = new Method(knex);
let platformRouter = new PlatformRouter(method);

app.use("/", platformRouter.router());

app.get("/", (req, res) => {
  res.send("Hello");
});

// Serve app
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
