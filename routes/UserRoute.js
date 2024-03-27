const mongoose = require('mongoose');
const express = require('express');
const { createUser, Login, getAllUsersByEmail, updateUserSubscriptionByEmail, getAllUsers, getAllUsersPhoneNumbers, getAllUsersWithActiveSubscription } = require('../controllers/UserController');
const { fetchWeatherForecast } = require('../controllers/MesageController');

const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

//register a new user
router.post('/register',createUser);

//login route
router.post('/login',Login);

//get user by email
router.get('/users/:email',getAllUsersByEmail);

//update user subscription
router.put('/subscription/:email',updateUserSubscriptionByEmail);


//get all the users
router.get('/allusers',getAllUsers)

//get all phone numbers
router.get('/phonenumbers',getAllUsersPhoneNumbers);


//get all phone numbers that are active
router.get('/activenumbers',getAllUsersWithActiveSubscription);

//get all phone numbers that are active
router.get('/weather',fetchWeatherForecast);


module.exports = router;