const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  verifyUser,
} = require("../controller/UserController");
const upload = require("../middlewares/uploadFile");
const expressRouter = express.Router();

// Get request
// get all users
expressRouter.get("/users", getUsers);

// get single user
expressRouter.get("/users/:id", getUser);

// delete single user
expressRouter.delete("/users/:id", deleteUser);

// Post request
expressRouter.post("/users/create", upload.single("image"), createUser);

// post request for verify token
expressRouter.post("/users/verify", verifyUser);

module.exports = expressRouter;
