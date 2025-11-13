import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  // Parse query params correctly
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token');

  if (!token) {
    ws.close(1008, 'Token required');
    return;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
    console.log('Authenticated user:', decoded);
  } catch (err) {
    console.log('JWT verification failed:');
    ws.close(1008, 'Invalid token');
    return;
  }

  // Now listen to messages from THIS client
  ws.on('message', function message(data) {
    console.log('Received:', data.toString());
    ws.send('pong');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Optional: send welcome message
  ws.send('Connected successfully');
});
