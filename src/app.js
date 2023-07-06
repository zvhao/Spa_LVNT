const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const { logger, options } = require("./utils");
const {
  catchError404ResourceNotFound,
  catchErrorIntervalServer,
} = require("./middleware/app.middleware");

const app = express();

// DB
require("./database/init.mongo");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression(options.comp(compression)));
app.use(helmet());
app.use(morgan("dev", { stream: logger }));

// Routes
app.use("/", require("./routes"));

// Catch error
app.use(catchError404ResourceNotFound);
app.use(catchErrorIntervalServer);

module.exports = app;
