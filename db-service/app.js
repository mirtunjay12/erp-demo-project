var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

const cors = require("cors");
const dotenv = require("dotenv");
// const dbConnection = require("../db/dbConnection");

dotenv.config();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Route not found"));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    // show stack only in development mode
    stack: req.app.get("env") === "development" ? err.stack : {}
  });
});

module.exports = app;
