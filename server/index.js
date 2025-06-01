// server/index.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
console.log("WebSocket server running on ws://localhost:3000");

const players = [];
wss.on('connection', (ws) => {
  console.log('Client connected');

  players.forEach(player => ws.send(player));
  ws.on('message', (player) => {
    console.log('Received:', message.toString());
    players.push(player);

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});
