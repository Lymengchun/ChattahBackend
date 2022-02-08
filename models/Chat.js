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
            type:reqString,
            message:reqString,
            time:reqString
        }
    ]
})

const chat = mongoose.model('chat',chatSchema);

module.exports = chat;