const bcrypt = require("bcryptjs");
const { encryptData, generateJwtToken } = require("../../middlewares/auth.js");

const baseModel = require('../../model-service/base-model.js');
const userSchema = new baseModel('users');
const roleSchema = new baseModel('roles')

const saltRounds = 10;


// User Login
const login = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    const findUser = await userSchema.findByEmail(email);


    if (!findUser) {
      return res.status(400).json({
        error: "",
        msg: "No user found.",
      });
    }

    const isMatch = await bcrypt.compare(password_hash, findUser.password_hash);
    if (!isMatch) {
      return res.status(400).json({
        error: "",
        msg: "Invalid credentials",
      });
    }

    findUser.password_hash = "";
    // const encriptedData = encryptData(JSON.stringify({ id: findUser.id }));
    const token = await generateJwtToken(findUser);
    res.status(200).json({ data: { findUser, token }, msg: "Success" });
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error._message });
  }

};

// Create user
const createUser = async (req, res) => {
  try {
    const userData = req.user;
    let { name, email, password_hash, role_id } = req.body;

    // Check role
    const checkRole = await roleSchema.findById({ role_id });
    if (!checkRole) {
      return res.status(400).json({
        error: "",
        msg: "Invalid data",
      });
    }


    let payload = { name, email, password_hash, role_id };

    payload.password_hash = await bcrypt.hash(password_hash, saltRounds);
    payload.company_id = userData.company_id;
    payload.created_by = userData.id;

    const data = await userSchema.create(payload);

    res.status(200).json({ data: data, msg: "Success" });
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error._message });
  }

};

// Get all user
const getAllUser = async (req, res) => {
  try {
    const user = req.user;
    let { page, limit } = req.query


    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;

    const data = await userSchema.findAll({ company_id: user.company_id, limit, offset });

    if (!data.length) {
      return res.status(400).json({
        error: "",
        msg: "No records found.",
      });
    }

    res.status(200).json({ data: data, msg: "Success" });
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error._message });
  }

};

//current user data
const currentUser = async (req, res) => {
  try {
    res.status(200).json({ data: req.user, msg: "Success" });
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error._message });
  }

};

module.exports = { login, createUser, getAllUser, currentUser };
