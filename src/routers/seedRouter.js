const express = require("express");
const seedApi = require("../controller/seedController");
const seedRouter = express.Router();

seedRouter.get('/users', seedApi)

module.exports = seedRouter;
