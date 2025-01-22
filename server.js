import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: 'atusaludlicoreria.com',
  user: 'atusalud_atusalud',
  password: 'kmachin1',
  database: 'atusalud_base1',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  connection.release();
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to database...');
  } else {
    throw err;
  }
});

// API Endpoints
app.get('/api/sales/total-value', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT SUM(Precio * Cantidad) AS totalValue
    FROM ventas_totales_2024
    WHERE Timestamp BETWEEN ? AND ?
  `;
  
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0].totalValue || 0);
  });
});

app.get('/api/sales/total-units', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT SUM(Cantidad) AS totalUnits
    FROM ventas_totales_2024
    WHERE Timestamp BETWEEN ? AND ?
  `;
  
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0].totalUnits || 0);
  });
});

app.get('/api/sales/unique-products', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT COUNT(DISTINCT SKU) AS uniqueProducts
    FROM ventas_totales_2024
    WHERE Timestamp BETWEEN ? AND ?
  `;
  
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results[0].uniqueProducts || 0);
  });
});

app.get('/api/sales/by-location', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT Sede, SUM(Precio * Cantidad) AS totalValue
    FROM ventas_totales_2024
    WHERE Timestamp BETWEEN ? AND ?
    GROUP BY Sede
  `;
  
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/sales/by-brand', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT Marca, SUM(Precio * Cantidad) AS totalValue
    FROM ventas_totales_2024
    WHERE Timestamp BETWEEN ? AND ?
    GROUP BY Marca
  `;
  
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
