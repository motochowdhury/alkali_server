const express = require("express");
const {getUsers, getUser, deleteUser} = require('../controller/UserController')
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/users", getUsers);
expressRouter.get("/users/:id", getUser);
expressRouter.delete("/users/:id", deleteUser);

module.exports = expressRouter;
