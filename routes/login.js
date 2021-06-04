const express = require('express');
const router = express.Router();

const Login = require('./../models/login');
const bcrypt = require('bcrypt');
const HttpStatusCodes = require('http-status-codes').StatusCodes;

//GET (get login)
router.get('/', (req, res) => {
    //get login
});

//POST (check auth)
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //get hash from DB
    Login.find({
        username 
    }, function(err, loginDoc) {
        if (err || loginDoc.length == 0) {
            console.error(err);
            return res.sendStatus(HttpStatusCodes.NOT_FOUND); // equivalent to res.status(404).send('Not Found')
        }
        console.log(loginDoc);
        bcrypt.compare(password, loginDoc[0].password, function(err, result) {
            if (err) {
                console.error(err);
                return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR); // equivalent to res.status(500).send('Internal Server Error')
            }
            //incorrect password
            if (result == false) {
                console.error('Incorrect password.');
                return res.sendStatus(HttpStatusCodes.FORBIDDEN); // equivalent to res.status(403).send('Forbidden')
            }
            //correct password
            return res.sendStatus(HttpStatusCodes.OK); // equivalent to res.status(200).send('OK')
        });
    });
});

//PUT (update)
router.put('/', (req, res) => {
    //put login
})

//DELETE (delete login)
router.delete('/', (req, res) => {
    //delete login
});

module.exports = router;