require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Environment validation
const requiredEnvVars = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OAuth token exchange endpoint
app.post('/api/auth/github/callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    console.log('🔄 Exchanging code for token...');
    
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token, error, error_description } = response.data;

    if (error) {
      console.error('❌ GitHub OAuth error:', error, error_description);
      return res.status(400).json({ 
        error: error_description || error 
      });
    }

    if (!access_token) {
      console.error('❌ No access token in response');
      return res.status(400).json({ 
        error: 'No access token received from GitHub' 
      });
    }

    console.log('✅ Token exchange successful');
    res.json({ access_token });
    
  } catch (error) {
    console.error('❌ Token exchange failed:', error.message);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      return res.status(error.response.status).json({ 
        error: error.response.data.error_description || 'Token exchange failed' 
      });
    }
    
    res.status(500).json({ error: 'Internal server error during token exchange' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ OAuth server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Token exchange: POST http://localhost:${PORT}/api/auth/github/callback`);
});
