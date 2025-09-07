require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});

// Check whether connection is wokring
// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     await connection.ping();
//     console.log('MySQL ping successful!');
//     connection.release();
//   } catch (err) {
//     console.error('Ping failed:', err.message);
//   }
// })();


module.exports = pool;
