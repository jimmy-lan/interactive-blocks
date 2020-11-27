"use strict";
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "/pub")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("[server.js] Listening on port " + port);
});
