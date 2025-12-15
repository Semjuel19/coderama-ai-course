# DevFinder OAuth Server

Express server for handling GitHub OAuth token exchange.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

3. Start server:
   ```bash
   npm run dev  # Development with auto-reload
   npm start    # Production
   ```

## Endpoints

- `GET /health` - Health check
- `POST /api/auth/github/callback` - Exchange OAuth code for access token

## Security Notes

- Never commit `.env` file
- Client secret must remain server-side only
- CORS configured for frontend URL only
