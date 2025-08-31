// app.js
"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");

const { initializeDatabases } = require("./libraries/initializeDatabases");
const voucherRoutes = require("./routes/vouchers.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DBs
initializeDatabases();

// Routes
app.use("/vouchers", voucherRoutes);

// Static assets
app.use("/assets", express.static(path.join(__dirname, "assets")));

module.exports = app;
