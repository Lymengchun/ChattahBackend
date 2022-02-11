const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth');
const chat = require('./routes/chatRounte');

const port = process.env.PORT || 4000;
const mongopath = 'mongodb+srv://admin:admin@chattah.c751d.mongodb.net/chattah?authSource=admin&replicaSet=atlas-h6qh6v-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect(mongopath,{useNewUrlParser: true,useUnifiedTopology:true})
const db = mongoose.connection;

db.on('error',(err) =>{
  console.log(err)
})

db.once('open',() => {
  console.log('Database Connection Established!')
})


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api',AuthRoute);
app.use('/api/chat',chat);
app.use('/api',require('./routes/app.routes'));

const server = app.listen(port, '0.0.0.0',()=>{
  console.log('server is Started on',port);
});



const io = require('socket.io')(server);

var clients = {};

//initialize socket
io.on('connection',(socket)=>{
  console.log("socket connected",socket.id);
  socket.on("disconnect",()=>{
    console.log("socket disconnected",socket.id);
  });

  socket.on('signin',(id)=>{
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });

  socket.on('message',(msg)=>{
    console.log(msg);
    if(clients[msg.targetId]) clients[msg.targetId].emit("message",msg);
  });

  
});






