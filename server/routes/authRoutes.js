import express from 'express';
const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  // Add CORS headers for production
  res.header('Access-Control-Allow-Origin', 'https://new-dash-dptvg2k8b-gfxjefs-projects.vercel.app');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Validate credentials
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'Admin User',
        username: 'admin',
        role: 'admin'
      }
    });
    console.log(`Successful admin login from: ${req.ip}`);
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

export default router;
