const express = require("express");
const {getUsers, getUser, deleteUser} = require('../controller/UserController')
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/users", getUsers);
expressRouter.get("/user/:id", getUser);
expressRouter.delete("/user/:id", deleteUser);

module.exports = expressRouter;
