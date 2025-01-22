import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 5000;

// Database configuration
const dbConfig = {
  host: 'atusaludlicoreria.com',
  database: 'atusalud_base1',
  user: 'atusalud_atusalud',
  password: 'kmachin1',
  port: 3306
};

// Middleware
app.use(cors());
app.use(express.json());

// Create database connection pool with enhanced configuration
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
  idleTimeout: 60000, // 1 minute
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000 // 10 seconds
});

// API Endpoints
app.get('/api/ventas', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM ventas_totales_2024');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
});

app.get('/api/ventas/total', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM ventas_totales_2024');
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching total sales:', error);
    res.status(500).json({ error: 'Error al obtener el total de ventas' });
  }
});

app.get('/api/ventas/total-value', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    // Convert USD to PEN (1 USD = 3.75 PEN)
    const [rows] = await connection.query(
      'SELECT SUM(Precio * Cantidad * 3.75) as totalValue FROM ventas_totales_2024'
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching total sales value:', error);
    res.status(500).json({ error: 'Error al obtener el valor total de ventas' });
  }
});

app.get('/api/ventas/total-units', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT SUM(Cantidad) as totalUnits FROM ventas_totales_2024'
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching total units sold:', error);
    res.status(500).json({ error: 'Error al obtener el total de unidades vendidas' });
  }
});

// New endpoint for sede statistics
app.get('/api/ventas/sede-stats', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT Sede, SUM(Precio * Cantidad * 3.75) as totalValue FROM ventas_totales_2024 GROUP BY Sede'
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sede stats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas por sede' });
  }
});

app.get('/api/ventas/unique-products', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT COUNT(DISTINCT SKU) as uniqueProducts FROM ventas_totales_2024'
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching unique products:', error);
    res.status(500).json({ error: 'Error al obtener el total de productos únicos vendidos' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
