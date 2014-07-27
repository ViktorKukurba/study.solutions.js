// Load the node-router library by creationix
var server = require('node-router').getServer();

// Configure our HTTP server to respond with Hello World the root request
server.get("/post", function (request, response) {
  response.simpleText(200, "Hello World! test");
});

// Listen on port 8080 on localhost
server.listen(8000, "localhost");