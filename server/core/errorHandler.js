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

  res.status(err.statusCode || 500).json(response);
};
