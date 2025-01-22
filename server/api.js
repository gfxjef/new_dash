import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

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

// Get total sales value
app.get('/api/sales/total-value', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [rows] = await pool.query(
      `SELECT SUM(Precio * Cantidad) as total 
       FROM ventas_totales_2024 
       WHERE Timestamp BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    res.json({ total: rows[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total units sold
app.get('/api/sales/total-units', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [rows] = await pool.query(
      `SELECT SUM(Cantidad) as total 
       FROM ventas_totales_2024 
       WHERE Timestamp BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    res.json({ total: rows[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get unique products sold
app.get('/api/sales/unique-products', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [rows] = await pool.query(
      `SELECT COUNT(DISTINCT SKU) as total 
       FROM ventas_totales_2024 
       WHERE Timestamp BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    res.json({ total: rows[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sales by location
app.get('/api/sales/by-location', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [rows] = await pool.query(
      `SELECT Sede, SUM(Precio * Cantidad) as totalValue 
       FROM ventas_totales_2024 
       WHERE Timestamp BETWEEN ? AND ?
       GROUP BY Sede`,
      [startDate, endDate]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sales by brand
app.get('/api/sales/by-brand', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [rows] = await pool.query(
      `SELECT Marca, SUM(Precio * Cantidad) as totalValue 
       FROM ventas_totales_2024 
       WHERE Timestamp BETWEEN ? AND ?
       GROUP BY Marca`,
      [startDate, endDate]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top 5 products by quantity
app.get('/api/inventario/top5', async (req, res) => {
  try {
    console.log('Fetching top 5 productos...');
    const [rows] = await pool.query(
      `SELECT 
        i.sku, 
        MAX(i.Nombre) as Nombre, 
        MAX(i.Modelo) as Modelo, 
        MAX(i.Tamaño) as Tamaño, 
        SUM(i.cantidad) as cantidad,
        JSON_OBJECTAGG(i.Sede, i.cantidad) as sedes,
        MAX(p.Photo) as Photo
       FROM inventario i
       JOIN productos p ON i.sku = p.SKU
       GROUP BY i.sku
       ORDER BY cantidad DESC 
       LIMIT 5`
    );
    
    console.log('Query result:', rows);
    
    if (!rows || rows.length === 0) {
      return res.json([]);
    }
    
    const productos = rows.map(row => ({
  id: row.sku,
  Nombre: row.Nombre || '',
  Modelo: row.Modelo || '',
  Tamaño: row.Tamaño || '',
  cantidad: row.cantidad || 0,
  sedes: row.sedes || {},
  Photo: row.Photo || 'https://via.placeholder.com/50'
    }));
    
    console.log('Formatted productos:', productos);
    res.json(productos);
  } catch (error) {
    console.error('Error in /api/inventario/top5:', error);
    res.status(500).json({ error: 'Error obteniendo productos' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Solicitud recibida:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    const { usuario, password } = req.body;
    
    if (!usuario || !password) {
      return res.status(400).json({ error: 'Usuario y password son requeridos' });
    }

    console.log('Credenciales recibidas:', { usuario, password });
    
    const [rows] = await pool.query(
      `SELECT uniqueID, Usuario, Pass, Rol, Nombres 
       FROM Usuarios 
       WHERE Usuario = ?`,
      [usuario]
    );

    if (rows.length === 0) {
      console.log('Usuario no encontrado:', usuario);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = rows[0];
    console.log('Usuario encontrado:', user);
    
    // Comparación temporal sin bcrypt mientras se implementa el hashing
    console.log('Password recibido:', password);
    console.log('Password en DB:', user.Pass);
    if (password !== user.Pass) {
      console.log('Contraseña no coincide');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Excluir el password de la respuesta
    const { Pass, ...userData } = user;
    res.json(userData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
