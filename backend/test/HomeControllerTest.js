var express = require('../config/express')();
var request = require('supertest')(express);

describe("HomeController", function () {

    it("#Get home", function (done) {
        request.get('/')
            .expect('Content-type', /json/)
            .expect(200, {
                message: 'Checkout our API at /api'
            }, done);
    });

    it("#Get /api", function (done) {
        request.get('/api')
            .expect('Content-type', /json/)
            .expect(200, {
                message: 'hooray! welcome to our api!'
            }, done);
    });

});
