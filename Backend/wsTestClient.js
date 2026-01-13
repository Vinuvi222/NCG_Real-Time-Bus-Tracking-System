  import WebSocket from 'ws';

// Connect to your WebSocket server
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('✅ Connected to WebSocket server');

  // Optional: send a test message to server
  ws.send(JSON.stringify({ type: 'test', message: 'Hello server!' }));
});

ws.on('message', (data) => {
  const busData = JSON.parse(data);
  console.log('📍 New message from server:', busData);
});

ws.on('close', () => {
  console.log('❌ WebSocket connection closed');
});

ws.on('error', (err) => {
  console.log('⚠️ WebSocket error:', err.message);
});  
