const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

const server = app.listen(port,()=>{
  console.log('server is Started on',port);
});


const io = require('socket.io')(server);

//initialize socket
io.on('connection',(socket)=>{
  console.log("socket connected",socket.id);
  socket.on("disconnect",()=>{
    console.log("socket disconnected",socket.id);
  });

  socket.on('test',(msg)=>{
    console.log(msg);
  });

  socket.on('message',(data)=>{
    console.log(data);
  });
});

