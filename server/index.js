const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const PORT = process.env.port || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("A connection triggered!!!");

  socket.on('join', ({name,room}, callback)=>{

    const { error, user } = addUser({id: socket.id, name, room})
      console.log(name,room);

      if(error) callback(error)

      socket.emit('message', {user: 'admin', text:`${user.name}, Welcome to the room ${user.room}`});
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name} has joined!`})

      socket.join(user.room);
      
      callback();
  })

  socket.on('sendMessage', (message,callback)=>{
    const user = getUser(socket.id);

    io.to(user.room).emit('message',{user: user.name, text: message});

    callback();
  })

  socket.on("disconnected", () => {
    console.log('user has left');
    // const user = removeUser(socket.id);

    // if(user){
    //   io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!!`})
    // }

  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has sarted on port ${PORT}`));
