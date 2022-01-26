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
           hello:req.body.hello
    })
   
        Chat.save()
        .then(response => {
            res.json({
                message: 'Users Added Successfully!'
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
    let chatID = req.body.chatID;
    let updatedData ={
        hello:req.body.hello
    }
   
    chat.findByIdAndUpdate(chatID, {$set: updatedData})
    .then(() => {
        res.json({
                message: 'User Updated Successfully!'
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
    let chatID = req.body.chatID
    Users.findByIdAndRemove(chatID)
    .then(() => {
        req.json({
            message: 'User deleted successfully!'
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