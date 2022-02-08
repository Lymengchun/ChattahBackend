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

    Users.findById(chatID)
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
    
    let Chat = new chat({
           sourceId:req.body.sourceId,
           targetId:req.body.sourceId,
           messages:req.body.messages
    })
   
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

// update an chat
const update = (req, res, next) => {
    let sourceId = req.body.sourceId;
    let targetId = req.body.sourceId
    let updatedData ={
        sourceId:req.body.sourceId,
        targetId:req.body.sourceId,
        messages:req.body.messages
    }
   
    chat.findByIdAndUpdate(sourceId,targetId, {$set: updatedData})
    .then(() => {
        res.json({
                message: 'chat Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })


}

// delete an Users
const destroy = (req, res, next) => {
    let sourceId = req.body.sourceId;
    let targetId = req.body.sourceId
    Users.findByIdAndRemove(sourceId,targetId)
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
    index, show, store, update, destroy
}