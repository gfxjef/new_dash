import mysql from 'mysql2/promise';

// Centralized database configuration
const dbConfig = {
  host: 'atusaludlicoreria.com',
  user: 'atusalud_atusalud',
  password: 'kmachin1',
  database: 'atusalud_base1',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
};

// Create and export connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to database');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
