// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var load = require('express-load');
var tokenVerify = require('./tokenVerify');

module.exports = function () {
    var app = express();

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // middleware to verify the auth token
    app.use(tokenVerify(app));

    // REGISTER OUR ROUTES -------------------------------
    load('routes', {cwd: 'app'}).into(app);

    // =========================================================================
    // connect to our database
    if (process.env.NODE_ENV == 'production') {
        //TODO set production db params
        mongoose.connect('mongodb://localhost/todo-mean');
    } else {
        mongoose.connect('mongodb://localhost/todo-mean');
    }

    var superSecret = process.env.SUPER_SECRET || '890dajklqr89afsjkl23i0';
    app.set('superSecret', superSecret);

    return app;
};
