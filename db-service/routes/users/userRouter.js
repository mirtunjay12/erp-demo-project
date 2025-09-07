const express = require("express");
const userController = require("./userController.js");
const userRouter = express();
const { userLoginValidation, createUser } = require("../../helpers/validate.js");
const auth = require('../../middlewares/auth.js')


// Login router
userRouter.post("/auth/login", userLoginValidation, userController.login);

// Create user
userRouter.post("/users", auth.auth, auth.roles('CA'), createUser, userController.createUser);

// Get All User Respective To Their Company
userRouter.get("/users", auth.auth, userController.getAllUser);

// Current user data
userRouter.get("/me", auth.auth, userController.currentUser);

module.exports = userRouter;
