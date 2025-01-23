const allowedOrigins = [
  // Dominios de Vercel con pattern matching
  /https:\/\/new-dash-.*-gfxjefs-projects\.vercel\.app/,
  'http://localhost:3000'
];

// Middleware CORS dinámico
export const corsMiddleware = (req, res, next) => {
  const origin = req.get('origin');
  const validOrigin = allowedOrigins.some(pattern => 
    typeof pattern === 'string' ? origin === pattern : pattern.test(origin)
  );
  
  if (validOrigin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }
  res.header('Vary', 'Origin');
  next();
};

export class APIError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class BusinessError extends APIError {
  constructor(errorCode, message, statusCode = 400) {
    super(message, statusCode, errorCode);
  }
}

export const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  
  const response = {
    success: false,
    error: {
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message
    }
  };

  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(err.statusCode || 500).header({
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Vary': 'Origin'
  }).json(response);
};
