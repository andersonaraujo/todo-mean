var app = require('./config/express')();
var port = process.env.PORT || 8080;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('Backend server running on port ' + port);
});

