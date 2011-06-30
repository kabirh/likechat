var sys  = require('sys');
var http = require('http');
var url  = require('url');

// require custom dispatcher
var dispatcher = require('./lib/dispatcher.js');

console.log('Starting server at http://127.0.0.1:8080/');

http.createServer(function (req, res) {
    // wrap calls in a try catch
    // or the node server will crash up any code errors
    try {
        //pipe some details to the node console
        console.log('Incoming request from: ' +
                    req.connection.remoteAddress +
                    ' for href: ' + url.parse(req.url).href
        );

        // dispatch our request
        dispatcher.dispatch(req, res);

    } catch (err) {
        // handles errors gracefully
        sys.puts(err);
        res.writeHead(500);
        res.end('Internal Server Error :(');
    }

}).listen(8080, "127.0.0.1", function() {
    // runs when our server is created
    console.log('Server running at http://127.0.0.1:8080/');
});
