const express = require("express");
const test = require("../controller/testController");
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/", test);

module.exports = expressRouter;
