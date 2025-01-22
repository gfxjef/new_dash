import express from 'express';
const router = express.Router();
import { executeQuery } from '../core/database.js';

// Total sales value endpoint
router.get('/total-value', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Fechas requeridas' });
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    const query = `
      SELECT SUM(Precio * Cantidad) as total 
      FROM ventas_totales_2024 
      WHERE Timestamp BETWEEN ? AND ?`;
      
    const result = await executeQuery(query, [formattedStart, formattedEnd]);
    
    if (!result || result.length === 0) {
      return res.json({ total: 0 });
    }
    
    res.json({ total: result[0].total || 0 });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Total Value Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Total units sold endpoint
router.get('/total-units', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Fechas requeridas' });
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    const query = `
      SELECT SUM(Cantidad) as total 
      FROM ventas_totales_2024 
      WHERE Timestamp BETWEEN ? AND ?`;
      
    const result = await executeQuery(query, [formattedStart, formattedEnd]);
    
    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Total Units Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Unique products sold endpoint
router.get('/unique-products', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Fechas requeridas' });
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    const query = `
      SELECT COUNT(DISTINCT SKU) as total 
      FROM ventas_totales_2024 
      WHERE Timestamp BETWEEN ? AND ?`;
      
    const result = await executeQuery(query, [formattedStart, formattedEnd]);
    
    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unique Products Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Sales by location endpoint
router.get('/by-location', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Fechas requeridas' });
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    const query = `
      SELECT Sede, SUM(Precio * Cantidad) as totalValue 
      FROM ventas_totales_2024 
      WHERE Timestamp BETWEEN ? AND ?
      GROUP BY Sede`;
      
    const result = await executeQuery(query, [formattedStart, formattedEnd]);
    
    res.json(result || []);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Sales by Location Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Sales by brand endpoint
router.get('/by-brand', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Fechas requeridas' });
    }

    const formattedStart = new Date(startDate).toISOString().split('T')[0];
    const formattedEnd = new Date(endDate).toISOString().split('T')[0];

    const query = `
      SELECT Marca, SUM(Precio * Cantidad) as totalValue 
      FROM ventas_totales_2024 
      WHERE Timestamp BETWEEN ? AND ?
      GROUP BY Marca`;
      
    const result = await executeQuery(query, [formattedStart, formattedEnd]);
    
    res.json(result || []);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Sales by Brand Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
