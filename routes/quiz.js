const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const Quiz = require('./../models/quiz');
const Login = require('./../models/login');
const HttpStatusCodes = require('http-status-codes').StatusCodes;

//GET (get quiz)
router.get('/', (req, res) => {
    //get quiz
});

//POST (create new)
router.post('/', (req, res) => {
    //post quiz
});

//PUT (update)
router.put('/', (req, res) => {
    //put quiz
})

//DELETE (delete quiz)
router.delete('/', (req, res) => {
    //delete quiz
});

module.exports = router;