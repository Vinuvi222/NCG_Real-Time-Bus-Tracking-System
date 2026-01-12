import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('Passenger connected via WebSocket');
  clients.add(ws);

  ws.on('close', () => {
    console.log('Passenger disconnected');
    clients.delete(ws);
  });
});

// Function to broadcast a location to all connected clients
export function broadcastBusLocation(busData) {
  const data = JSON.stringify(busData);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

console.log('WebSocket server running on ws://localhost:8080');

