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
const people = []

io.on('connection', (socket) => {
  console.log('connected')

  socket.on('setPeople', person => {
    const unRegistered = people.find(aPerson => aPerson.name === person.name)
    if(!unRegistered){
      people.push(person)
    }
    people.forEach(el => {
      el.isOnline = true
    })
    io.emit('people', people)
  })
  socket.on('setMessages', () => {
    socket.emit('messages', messages)
  })
  socket.on('chat', (message) => {
    messages.push(message)
    io.emit('SendChat', message)
  })
  socket.on('offline', () => {
    // people.forEach(person => {
    //   if(person.name === payload.name){
    //     person.isOnline = false
    //   }
    // })
    // console.log(people)
    // var i = people.indexOf(socket);
    // people.splice(i, 1);
    // io.emit('people', people)
  })
  socket.on('disconnect', () => {
    console.log('disconnected');
    io.emit('offline')
  });
})

http.listen(PORT, () => {
  console.log(`This app is Running on Port: ${PORT}`)
})