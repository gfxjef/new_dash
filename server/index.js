import express from 'express';
import cors from 'cors';
import { errorHandler } from './core/errorHandler.js';
import './core/database.js';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();
const port = process.env.PORT; // Railway asigna el puerto automáticamente

// Configurar CORS
const whitelist = [
  'http://localhost:5173', // Vite dev server
  process.env.VERCEL_URL // URL de Vercel en producción
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Formato de respuestas API
app.use((req, res, next) => {
  res.apiSuccess = (data, message = '') => {
    res.json({
      success: true,
      data,
      message
    });
  };
  next();
});

// Headers de seguridad para producción
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
}

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/inventario', inventoryRoutes);
app.use('/api/sales', salesRoutes);

// Manejo de errores (DEBE ser el último middleware)
app.use(errorHandler);

// Inicio del servidor con nueva configuración DB
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📅 ${new Date().toLocaleString()}`);
  console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('✅ Database connection established');
});
