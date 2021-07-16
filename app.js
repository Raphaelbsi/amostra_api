var express = require("express");
var path = require("path");
var logger = require("morgan");
require("./config/database");

var usuariosRouter = require("./app/routes/usuarios");
var biosRouter = require("./app/routes/bios");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/usuarios", usuariosRouter);

app.use("/bios", biosRouter);

module.exports = app;
