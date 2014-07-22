var express = require('express'),
    app = express(),
    server;

app.use(express.static(__dirname + '/resources'));

app.get('/', function(req, res){
    res.sendfile('pages/index.html');
});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});