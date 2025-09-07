var express = require("express");
var router = express.Router();
const userRouter = require("./users/userRouter");
const roleRouter = require("./roles/roleRouter");


// User Router
router.use("/", userRouter);

// Roles router
router.use("/", roleRouter);

module.exports = router;
