const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 4001;

// now app.get('port') will return 3000

// req object = THE http request
// res object = THE http response that the Express app sends
//              when it gets a request
// express.static(root) is a built-in middleware function


//app.use(path, express.static(__dirname+'/src'))
// when the client requests to use path
// express.static will serve __dirname/src/res.url to path 
//app.use('/src', express.static(__dirname + '/src'));
// app.use(path, callback) is application level middleware
// middleware/HTTP request method model:
//
// client request ---> express server ---> response
// the express server is the middleware and runs
// the middleware functions
// the express server handles routing:
// app.METHOD(PATH, HANDLER)
// Respond to a METHOD request to the PATH route 
// HANDLER is executed when the METHOD and PATH are matched


// I think 'node server.js' represents a get request to '/'
// ReactDOM in index.js doesn't render
// it probably doesn't render for the same reason
// it doesn't when opening index.html by itself
/*
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'))
});
*/

let interval;

var namespaces = [];

io.on('connection', (socket) => {
    var newGameNamespace = socket.id.substring(0,5);
    socket.emit('newGameID', newGameNamespace);
    socket.on('newState', (data) => {
        io.sockets.emit('setState', data);
    });
    socket.on('disconnect', () => {
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});

