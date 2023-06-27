const express = require("express");
const getUsers = require('../controller/getUserController')
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/users", getUsers);

module.exports = expressRouter;
