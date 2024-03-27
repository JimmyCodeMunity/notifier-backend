const mongoose = require('mongoose');
const express = require('express');
const { createUser, Login, getAllUsersByEmail, updateUserSubscriptionByEmail, getAllUsers, getAllUsersPhoneNumbers, getAllUsersWithActiveSubscription } = require('../controllers/UserController');
const { fetchPhoneNumbers, SendMessage } = require('../controllers/MesageController');

const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

// get phone numbers
router.get('/getphone',fetchPhoneNumbers);

//send meassage
// router.get('/sendmessage',SendMessage);

// //login route
// router.post('/login',Login);

// //get user by email
// router.get('/users/:email',getAllUsersByEmail);




module.exports = router;