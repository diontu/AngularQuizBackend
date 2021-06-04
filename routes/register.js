const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const Login = require('./../models/login');
const HttpStatusCodes = require('http-status-codes').StatusCodes;

//POST (create new)
router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) {
            console.error(err);
            return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        } 
        //store the hash in the password DB
        const newLogin = new Login({
            firstName,
            lastName,
            username,
            password: hash
        });

        //check if username exists in DB
        await Login.find({
            username
        }, function(err, loginDoc) {
            if (err) {
                console.error(err);
                return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR); // equivalent to res.status(500).send('Internal Server Error')
            }
            // no username found 
            if (loginDoc.length > 0) {
                console.error('Non-unique username chosen');
                return res.sendStatus(HttpStatusCodes.CONFLICT); // equivalent to res.status(409).send('CONFLICT')
            }
        });

        //if response headers were sent, return
        console.log('headers sent: ' + res.headersSent);
        if (res.headersSent) return;

        newLogin.save(function(err, loginDoc) {
            if (err) {
                console.error(err);
                return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
            }
            console.log(loginDoc);
            // console.log(loginDoc[0].username + " saved as a new login!"); 
            return res.sendStatus(HttpStatusCodes.OK);
        });
    });
});

module.exports = router;