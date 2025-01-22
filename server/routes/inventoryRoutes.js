import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/top5', async (req, res) => {
  try {
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
    
    const productos = rows.map(row => ({
      id: row.sku,
      Nombre: row.Nombre || '',
      Modelo: row.Modelo || '',
      Tamaño: row.Tamaño || '',
      cantidad: row.cantidad || 0,
      sedes: row.sedes || {},
      Photo: row.Photo || 'https://via.placeholder.com/50'
    }));
    
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo productos' });
  }
});

export default router;
