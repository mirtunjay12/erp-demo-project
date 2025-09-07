const pool = require('./dbConnection');
const schema = require('./dbConfig');

class BaseModel {
  constructor(tableName) {
    if (!schema[tableName]) {
      throw new Error(`Table "${tableName}" is not allowed`);
    }
    this.tableName = tableName;
    this.allowedColumns = schema[tableName];
  }

  validateColumns(data) {
    const keys = Object.keys(data);
    for (const key of keys) {
      if (!this.allowedColumns.includes(key)) {
        throw new Error(`Invalid column: ${key}`);
      }
    }
    return true;
  }

  // CREATE
  async create(data) {
    this.validateColumns(data);

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO \`${this.tableName}\` (${keys.join(', ')}) VALUES (${placeholders})`;
    const [result] = await pool.query(sql, values);
    return result.insertId;
  }

  // READ ALL
  async findAll(filter = {}) {
    let { company_id, limit, offset, orderBy, order = "ASC" } = filter;

    let sql = `SELECT * FROM \`${this.tableName}\``;
    let params = [];

    if (company_id) {
      sql += ` WHERE company_id = ?`;
      params.push(company_id);
    }

    if (orderBy) {
      sql += ` ORDER BY \`${orderBy}\` ${order.toUpperCase() === "DESC" ? "DESC" : "ASC"}`;
    }

    if (limit) {
      sql += ` LIMIT ? OFFSET ?`;
      params.push(Number(limit), Number(offset || 0));
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  }

  // READ ONE BY ID
  async findById(filter) {
    let sql = `SELECT * FROM \`${this.tableName}\``;
    let { id, role_id } = filter;


    let params = []

    if (role_id) {
      sql += ` WHERE role_id = ?`;
      params.push(role_id);
    } else {
      sql += ` WHERE id = ?`;
      params.push(id);
    }

    const [rows] = await pool.query(sql, params);
    return rows[0] || null;
  }

  // READ ONE BY EMAIL
  async findByEmail(email) {
    const sql = `SELECT * FROM \`${this.tableName}\` WHERE email = ?`;
    const [rows] = await pool.query(sql, [email]);
    return rows[0] || null;
  }

  // UPDATE
  async update(id, data) {
    this.validateColumns(data);

    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const sql = `UPDATE \`${this.tableName}\` SET ${setClause} WHERE id = ?`;
    const [result] = await pool.query(sql, [...values, id]);
    return result.affectedRows;
  }

  // DELETE
  async delete(id) {
    const sql = `DELETE FROM \`${this.tableName}\` WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  }
}

module.exports = BaseModel;
