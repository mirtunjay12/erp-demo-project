const express = require("express");
const roleController = require("./roleController.js");
const roleRouter = express();
const auth = require('../../middlewares/auth.js')


// Current user data
roleRouter.get("/roles", auth.auth, roleController.getAllRoles);

module.exports = roleRouter;
