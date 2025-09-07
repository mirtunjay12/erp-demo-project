const baseModel = require('../../model-service/base-model.js');
const roleSchema = new baseModel('roles')

//Get all roles
const getAllRoles = async (req, res) => {
  try {
    const data = await roleSchema.findAll({ orderBy: "role_id" });
    if (!data.length) {
      return res.status(404).json({ msg: "No roles found" });
    }
    res.status(200).json({ data: data, msg: "Success" });
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error._message });
  }

};

module.exports = { getAllRoles };
