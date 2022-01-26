const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema type String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema

const usersSchema = new Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
        unique:true,
        required:true,
        dropDups: true,
        index:true
    },
    password:{
        type: String
    }
    

}, {timeseries: true});

const Users = mongoose.model('Users',usersSchema);

module.exports = Users;