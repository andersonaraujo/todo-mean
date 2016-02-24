var crypto = require('crypto');
var User = require('../models/user');


var isAdmin = function (req) {
    return req.decoded && req.decoded.user && req.decoded.user.admin;
};

module.exports = function (app) {

    app.get('/api/users/setup', function (req, res) {

        // Only admin users allowed to this resource
        if (!isAdmin(req)) {
            return res.status(403).send({
                success: false,
                message: "You're not alloweed to this resource."
            });
        }

        var username = process.env.ADMIN_USER || 'admin';

        var hashedPassword = crypto
            .createHmac("md5", app.get('superSecret'))
            .update('1q2w3e4r')
            .digest('hex');

        // create a admin user
        var admin = new User({
            username: username,
            password: hashedPassword,
            admin: true
        });

        // save the sample user
        admin.save(function (err) {
            if (err)
                res.send(err);
            else
                res.json({success: true});
        });

    });

    // get all the users (accessed at GET /api/users)
    app.get('/api/users', function (req, res) {
console.log(req.decoded);

        // Only admin users allowed to this resource
        if (!isAdmin(req)) {
            return res.status(403).send({
                success: false,
                message: "You're not alloweed to this resource."
            });
        }

        User.find(function (err, users) {
            if (err)
                res.send(err);
            else
                res.json(users);
        });
    });

    // create new users
    app.post('/api/users', function (req, res) {

        // Only admin users allowed to this resource
        if (!isAdmin(req)) {
            return res.status(403).send({
                success: false,
                message: "You're not alloweed to this resource."
            });
        }

        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid request."
            });
        }

        var hashedPassword = crypto
            .createHmac("md5", app.get('superSecret'))
            .update(password)
            .digest('hex');

        // create a user
        var user = new User({
            username: username,
            password: hashedPassword,
            admin: req.body.admin || false
        });

        // save the sample user
        user.save(function (err) {
            if (err)
                res.send(err);
            else
                res.json({success: true});
        });

    });

};
