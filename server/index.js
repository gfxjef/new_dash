import express from 'express';
import cors from 'cors';
import { errorHandler } from './core/errorHandler.js';
import './core/database.js';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();
const port = process.env.PORT || 3002;

// Configurar CORS
const whitelist = [
  'http://localhost:5173',
  'https://new-dash-dptvg2k8b-gfxjefs-projects.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir sin origen en desarrollo y solicitudes del mismo origen
    if (!origin || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    console.log('[CORS] Origen detectado:', origin);
    
    const allowedOrigins = new Set(whitelist);
    if (allowedOrigins.has(origin)) {
      console.log('[CORS] Origen permitido');
      callback(null, true);
    } else {
      console.log('[CORS] Origen bloqueado');
      callback(new Error('Origen no permitido'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middlewares base
app.use(express.json({ strict: true, type: 'application/json' }));
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

// Endpoint de diagnóstico
app.get('/api/health', (req, res) => {
  res.apiSuccess({
    status: 'active',
    corsWhitelist: whitelist,
    nodeEnv: process.env.NODE_ENV,
    allowedOrigins: whitelist
  });
});

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
