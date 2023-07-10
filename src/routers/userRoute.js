const express = require("express");
const {getUsers, getUser, deleteUser, createUser} = require('../controller/UserController')
const expressRouter = express.Router();

// Get request
// get all users
expressRouter.get("/users", getUsers);

// get single user
expressRouter.get("/users/:id", getUser);

// delete single user
expressRouter.delete("/users/:id", deleteUser);

// Post request
expressRouter.post("/users/create", createUser)

module.exports = expressRouter;
