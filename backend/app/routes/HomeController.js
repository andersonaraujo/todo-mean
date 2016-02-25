module.exports = function (app) {

    app.get('/', function (req, res) {
        res.json({message: 'Checkout our API at /api'});
    });

    app.get('/api', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

};