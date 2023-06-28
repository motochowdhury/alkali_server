const express = require("express");
const {getUsers, getUser} = require('../controller/getUserController')
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/users", getUsers);
expressRouter.get("/user/:id", getUser);

module.exports = expressRouter;
