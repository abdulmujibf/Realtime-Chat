const express = require('express')
const app = express()
const PORT = 3001
const http = require('http').Server(app)

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
    credentials: true
  },
  allowEIO3: true
});

const messages = []

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('setMessages', () => {
    console.log('masuk')
    socket.emit('messages', messages)
  })
  socket.on('chat', (message) => {
    messages.push(message)
    io.emit('SendChat', message)
  })
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
})

http.listen(PORT, () => {
  console.log(`This app is Running on Port: ${PORT}`)
})