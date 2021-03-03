const server = require("./app");
var config = require("./config");

var port = parseInt(config.initialPort);

server.listen(port, "0.0.0.0");
console.log("Server start: " + port);
