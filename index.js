const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UsersRoute = require('./routes/users');
const mongoose = require('mongoose');
const Users = require('./models/Users');
const router = require('./routes/users');

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/chattah',{useNewUrlParser: true,useUnifiedTopology:true})
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
app.use('/api/users',UsersRoute);

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






