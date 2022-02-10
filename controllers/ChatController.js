const { response } = require('express')
const chat = require('../models/Chat')

//show the list of users

const index = (req,res, next)=>{
    chat.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(errors => {
        res.json({
            message:'An error Occured!',
            errors
        })
    })

}


// Show single User
const show = (req, res, next) => {
    let chatID = req.body.chatID;

    chat.findById(chatID)
    .then(response => {
        res.json({
            response
        })
    })

    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// add new chat
const store = (req, res, next) => {
    let sourceId = req.body.sourceId;
    let targetId = req.body.targetId;
    let messages  = {messages:req.body.messages};
 
    let Chat = new chat({
           sourceId:sourceId,
           targetId:targetId,
           messages:req.body.messages
    })
    chat.findOne({$and:[{$or:[{sourceId:sourceId},{sourceId:targetId}]},{$or:[{targetId:sourceId},{targetId:targetId}]}]})
    .then(chats =>{
        
        if(chats){
            chat.updateOne({$and:[{$or:[{sourceId:sourceId},{sourceId:targetId}]},{$or:[{targetId:sourceId},{targetId:targetId}]}]},{$push:messages})
            .then(() => {
                res.json({
                    message: 'chat push successfully!'
                })
            })
            .catch(()=>{
                res.json({
                    message: 'An error Occured!'
                })
            })
        }else{
            console.log(Chat);
            Chat.save()
        .then(response => {
            res.json({
                message: 'chat Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })

        }
    }
 
    ).catch(error =>{
        res.json({
            error
        })
    })


}

const getchat = (req,res,next) => {
    chat.findOne({$and:[{$or:[{sourceId:req.body.sourceId},{sourceId:req.body.targetId}]},{$or:[{targetId:req.body.sourceId},{targetId:req.body.targetId}]}]})
    .then(response =>{
        res.json({
            response:response['messages'],
            message: 'get chat data Successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured!',
            error
        })
    })

}

const getownchat = (req,res,next) => {
    chat.find({$or:[{sourceId:req.body.sourceId},{targetId:req.body.sourceId}]})
    .then(response =>{
        res.json({
            response:response['messages'],
            message: 'get own chat list successfully!'
        })
        console.log('messages:'+response)
    })
    .catch(error =>{
        res.json({
            message: 'An error Occured!',
            error
        })
    })
}

// update an chat
const update = (req, res, next) => {
    let chatId = req.body.chatId;

    let updatedData ={
        messages:req.body.messages
    }
   
    chat.findByIdAndUpdate(chatId, {$set: updatedData})
    .then(() => {
        res.json({
                message: 'chat Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!',
            error
        })
    })


}

const pushMessage = (req,res,next)=>{
    let chatId = req.body.chatId;

    let message = {messages:req.body.messages}
    // console.log(message);

    chat.findOneAndUpdate(chatId, {$push: message})
    .then(() => {
        res.json({
                message: 'chat push Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!',
            error
        })
    })
}

// delete an Users
const destroy = (req, res, next) => {
    let sourceId = req.body.sourceId;
    let targetId = req.body.sourceId
    chat.findByIdAndRemove(sourceId,targetId)
    .then(() => {
        req.json({
            message: 'chat deleted successfully!'
        })
    })
    .catch(error => {
        req.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy,pushMessage,getchat,getownchat
}