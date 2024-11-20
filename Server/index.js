const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
require('dotenv').config();
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://text-drop.vercel.app',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());


app.get('/get',(req,res)=>{
  res.json({message:"Hello Om Here"})
})

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    const users = await io.in(room).fetchSockets();
    const clients = users.map((client) => client.id);
    console.log(clients);
    io.to(room).emit('getUsers', clients); // Emit only to the room
  });

  socket.on('sendMessage', async ({ message, room }) => {
    console.log(`Socket ${socket.id} sent message ${message} to room ${room}`);
    socket.to(room).emit('message', message); // Exclude the sender
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
