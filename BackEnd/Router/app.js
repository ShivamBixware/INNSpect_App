const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');

const port = 3001;

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/admin.innspect.app/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/admin.innspect.app/fullchain.pem'),
    secureProtocol: 'TLSv1_2_method',
    ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:HIGH:!aNULL:!MD5',
    honorCipherOrder: true,
};


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: 'admin.innspect.app', // Change this to your frontend URL in production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Import Routes
const Router = require('./Router/Router');

// Use Routes
app.use('/API/Registration', Router);
app.use('/API/ManageCompanies', Router);
app.use('/API/Login', Router);
app.use('/API/SuperAdminDashboard', Router);

// Create HTTP server
const server = https.createServer(options, app);

// Create WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server, path: '/ws' });


// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  // Send a message to the client
  ws.send('Hello Client!');
});

// Start the HTTP and WebSocket server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
