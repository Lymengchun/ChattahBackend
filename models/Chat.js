const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqString = {
    type:String,
    required:true
}

const chatSchema = new Schema({
    sourceId:reqString,
    targetId:reqString,
    messages:[
        {
            type:{type:String},
            message:{type:String},
            time:{type:String}
        }
    ]
})

const chat = mongoose.model('chat',chatSchema);

module.exports = chat;