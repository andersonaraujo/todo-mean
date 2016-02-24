var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function (app) {

    // route to authenticate a user (POST /api/authenticate)
    app.post('/api/authenticate', function (req, res) {

        // find the user
        User.findOne({username: req.body.username}, function (err, user) {

            if (err) {
                res.send(err);
                return;
            }

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
                return;
            }

            if (!req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
                return;
            }

            var hashedPassword = crypto
                .createHmac("md5", app.get('superSecret'))
                .update(req.body.password)
                .digest('hex');

            // check if password matches
            if (user.password != hashedPassword) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
                return;
            }

            // if user is found and password is right, create a token
            var token = jwt.sign({user: user}, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });

        });
    });

};
