var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var homeController = require('../app/routes/HomeController');

describe("TodoController", function () {

    it("#Get all todos", function () {
        var req, res, spy;
        req = res = {};
        spy = res.send = sinon.spy();

        homeController(req, res);
        //    expect(spy.calledOnce).to.equal(true);
    });

});
