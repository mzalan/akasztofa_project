// // server/index.js
// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8081 });
// console.log("WebSocket server running on ws://localhost:8081");

// // const players = [];
// let players = []; 

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Send existing players to new client
//   // players.forEach(player => ws.send(player));

//   // Handle incoming messages
//   ws.on('message', (player) => {
//     console.log('receiived:', player.toString());
//     players.push(player);
//     console.log(players);
//     console.log("rgewewewewewewewewvuijb");
//     // Broadcast to all clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(player.toString());
        
        
//       }
//     });
//   });

//   ws.on('close', () => console.log('Client disconnected'));
// });
// server/index.js
const WebSocket = require('ws');
// if (player === '__RESET__') {
//   clients = [];
//   console.log("Clients manually cleared");
//   return;
// }
const wss = new WebSocket.Server({ port: 8081 });
console.log("WebSocket server running on ws://localhost:8081");

// Track users: { ws: WebSocket, username: string | null }
let clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push({ ws, username: null });
  ws.on('message', (msg) => {
    if (typeof msg !== 'string' && !Buffer.isBuffer(msg)) {
    console.log('Ignoring non-text message');
    return;
    }

    const player = msg.toString(); // ensures it's a string
    const message = msg.toString();
    console.log('Received:', message);

    const client = clients.find(c => c.ws === ws);

    // First message is assumed to be the username
    if (client && client.username === null) {
      client.username = message;

      // Broadcast updated player list
      broadcastPlayerList();
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove client from list
    const index = clients.findIndex(c => c.ws === ws);
    if (index !== -1) {
      clients.splice(index, 1);
      broadcastPlayerList(); // Update the list for everyone
    }
  });
});

function broadcastPlayerList() {
  const usernames = clients
    .filter(c => c.username !== null)
    .map(c => c.username);

  console.log('Active players:', usernames);

  const data = JSON.stringify({ type: "players", players: usernames });

  clients.forEach(client => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  });
}
