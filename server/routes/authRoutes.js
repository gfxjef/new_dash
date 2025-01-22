import express from 'express';
const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Mock response
  res.status(200).json({
    success: true,
    token: 'mock-jwt-token',
    user: {
      id: 1,
      name: 'Admin User',
      email: req.body.email,
      role: 'admin'
    }
  });
  
  console.log(`Login attempt from: ${req.body.email}`);
});

export default router;
