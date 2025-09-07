// Define allowed tables and their columns
const schema = {
  users: ['id', 'name', 'email', 'password_hash','is_active','is_delete', 'role_id', 'company_id','created_by'],
  roles: ['role_id', 'name', 'description'],
  companies: ['company_id', 'name', 'address']
};

module.exports = schema;
