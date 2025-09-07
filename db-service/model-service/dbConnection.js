const mysql = require('mysql2/promise');

// Create a pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'erp',
    waitForConnections: true,
    connectionLimit: 10,
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
