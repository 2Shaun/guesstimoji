const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 4001;

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

io.sockets.on('connection', (socket) => {
    //console.log(`connection made ${socket.id}`);
    socket.on('roomFound', (data) => {
        socket.emit('updateUI', data);
    });
    socket.on('subscribe', (data) => { 
        socket.join(data); 
        socket.broadcast.to(data).emit('playerJoinedYourRoom');
        // DEBUG SOCKET IO WITH CONSOLE LOG
        //console.log(`${socket.id} has joined ${data}`);
    });
    socket.on('unsubscribe', (data) => { socket.leave(data); });
    /*
    this will need to be done on the 
    room reserved for the game
    ...
    I'm not sure I'm going to have each
    room listen yet
    the gamepage might need to emit
    to the root room with the 
    game specific room as data
    */
    // servers are kind of all-receiving
    // when it says a broadcast doesn't go to 'sender'
    // it means it doesn't go to the CLIENT who caused it
    socket.on('freshBoard', (data) => {
        socket.broadcast.to(data.room).emit('setState', data.squares);
        socket.broadcast.to(data.room).emit('setFreshBoard', data.board);

    });
    socket.on('newState', (data) => {
        // if this is broadcasted to sender,
        // you're liable to cause an inf loop
        socket.broadcast.to(data.room).emit('setState', data.squares);
        //console.log(`${socket.id} has sent ${data.squares} to ${data.room}`);
        //socket.emit('setState', data.squares);
        //io.emit('setState', data.squares);
    });
});


server.listen(port, () => {
    //console.log(`Starting server on port ${port}`);
});

