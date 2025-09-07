const { validationResult, body } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

// User signup validation
const userLoginValidation = [
  body("email").notEmpty().withMessage("email is requried"),
  body("password_hash").notEmpty().withMessage("Password is requried"),
  handleValidationErrors,
];

//Create User validation
const createUser = [
  body("email").notEmpty().withMessage("email is requried"),
  body("password_hash").notEmpty().withMessage("Password is requried"),
  body("name").notEmpty().withMessage("name is requried"),
  body("role_id").notEmpty().withMessage("role id is requried"),
  handleValidationErrors,
];

module.exports = { userLoginValidation,createUser };
