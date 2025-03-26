// ws-server.js
const WebSocket = require('ws');

// Create a WebSocket server on port 3001
const server = new WebSocket.Server({ port: 3001 });

server.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for messages from clients
    socket.on('message', (message) => {
        console.log('received: %s', message);
        // You can also send messages back to the client
        socket.send('Message received: ' + message);
    });

    // Optional: Send a welcome message to the newly connected client
    socket.send('Welcome to the WebSocket server!');
});

server.on('close', () => {
    console.log('Client disconnected');
});

