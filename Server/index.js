const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'https://text-drop.vercel.app',
    methods: ['GET', 'POST'],
  },
});

app.get('/get', (req, res) => {
  res.json({ message: "Hello Om Here" });
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    const users = await io.in(room).fetchSockets();
    const clients = users.map((client) => client.id);
    console.log(clients);
    io.to(room).emit('getUsers', clients);
  });

  socket.on('sendMessage', async ({ message, room }) => {
    console.log(`Socket ${socket.id} sent message ${message} to room ${room}`);
    socket.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

module.exports = (req, res) => {
  if (req.method === 'GET') {
    return app(req, res);
  }
  return httpServer(req, res);
};