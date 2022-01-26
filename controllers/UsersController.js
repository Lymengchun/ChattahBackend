const { response } = require('express');
const { deleteOne } = require('../models/Users');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
        let user = new Users ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    })

   
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    // Users.findOne({email:username})
    Users.findOne( { $or: [ { name: username}, { email: username} ] } )
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password,function(err, result){
                if(err) {
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name},'&*kls6548',{expiresIn:'30s'})
                    let refreshtoken = jwt.sign({name: user.name},'*(&()5dsa',{expiresIn:'48h'})
                    res.json({ 
                        message:'Login Successful!',
                        token,
                        refreshtoken
                    })
                }else{
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}


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
                    email:req.body.facebookID,
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
     index, show, store, update, destroy,register,login
 }