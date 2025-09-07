const jwt = require("jsonwebtoken");

const baseModel = require('../model-service/base-model');
const roleSchema = new baseModel('roles')


const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
    if (error) {
      return res.status(401).json({ msg: "Invalid token!" });
    }

    req.user = data.user;
    return next();
  });
};

const generateJwtToken = async (data) => {
  const token = jwt.sign({ user: data }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};


const roles = (role) => async (req, res, next) => {
  const user = req.user;


  const checkRole = await roleSchema.findById({ role_id: user.role_id });



  if (!checkRole) {
    return res.status(403).json({ msg: "You are not eligibile" });
  }


  if (role !== checkRole.name) {
    return res.status(403).json({ msg: "You are not authorized" });
  }


  return next();
};


module.exports = { generateJwtToken, roles, auth };
