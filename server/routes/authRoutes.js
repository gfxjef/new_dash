import express from 'express';
import { APIError, BusinessError } from '../core/errorHandler.js';
import rateLimit from 'express-rate-limit';
const router = express.Router();

// Rate limiter para protección contra brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Límite de 5 intentos por IP
  message: 'Demasiados intentos de login desde esta IP'
});

// Login endpoint
router.post('/login', loginLimiter, (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      throw new BusinessError('MISSING_CREDENTIALS', 'Usuario y contraseña requeridos');
    }

    // Validar contra variables de entorno en producción
    const isProd = process.env.NODE_ENV === 'production';
    const validUser = isProd 
      ? username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS
      : username === 'admin' && password === 'admin';

    if (!validUser) {
      throw new BusinessError('INVALID_CREDENTIALS', 'Credenciales inválidas');
    }

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'Admin User',
        username: isProd ? process.env.ADMIN_USER : 'admin',
        role: 'admin'
      }
    });
    console.log(`Login exitoso desde IP: ${req.ip}`);
    
  } catch (error) {
    next(error);
  }
});

export default router;
