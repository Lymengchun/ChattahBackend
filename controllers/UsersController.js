const { response } = require('express');
const { deleteOne } = require('../models/Users');
const Users = require('../models/Users');

// Show the list of users
const index = (req, res, next) => {
     Users.find()
     .then(response => {
         res.json({
             response
         })
     })
     .catch(errors => {
         res.json({
             message: 'An error Occured!'
         })
     })
};

// Show single User
const show = (req, res, next) => {
    let userID = req.body.userID;

    Users.findById(userID)
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

// add new users
const store = (req, res, next) => {
    let users = new Users({
                    name: req.body.name,
                    facebookID:req.body.facebookID,
                    image: req.body.image
    })
   
        users.save()
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

// update an users
const update = (req, res, next) => {
    let userID = req.body.userID;

    let updatedData = {
        name: req.body.name,
        facebookID: req.body.facebookID,
        image: req.body.image
    }

    Users.findByIdAndUpdate(userID, {$set: updatedData})
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
     let userID = req.body.userID
     Users.findByIdAndRemove(userID)
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