const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 5000;

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

// rooms data structure needs to be fixed
var rooms = new Map(); 

io.sockets.on('connection', (socket) => {
    //console.log(`connection made ${socket.id}`);
    const id = socket.id;
    console.log(`User connected: ${id}`);
    socket.on(`joinRoom`, (data) => {
        /*const test = ((input) => {
            socket.join(data.room);
            return input;
        })(1);
        */
        socket.join(data.room);
    });
    socket.on('requestGameUpdate', (data) => {
        const room = data.room;
        var board = data.board;
        if(rooms.get(room) === undefined){
            // choices should be an array
            // I want rooms to be a data structure such that I can do 
            // rooms.set(data.room).board = data.board
            //rooms.set(data.room, {board: data.board, numPlayers: 1, player1Choice: '', player2Choice: ''});
            rooms.set(room, {board: board, numPlayers: 1, choices: []});
            // want to switch gameUpdate to go to socketID
            io.in(room).emit(`gameUpdate`, {board: board, numPlayers: 1}); 
        } else {
            board = rooms.get(room).board;
            const numPlayers = rooms.get(room).numPlayers+1;
            rooms.get(room).numPlayers = numPlayers;
            io.in(data.room).emit('gameUpdate', {board: board, numPlayers: numPlayers}); 
        }
    });
    socket.on('chatMessageSent', data => {
        const player = data.player;
        const username = `Player ${player}: `;
        const opponent = (player % 2) + 1;
        const msg = data.msg;
        const wins = "WINS";
        const room = data.room;
        const turn = data.turn;
        console.log(username + msg);
        // the winning condition is to send a message that is your opponent's choice
        if(rooms.get(room).choices[opponent] === msg){
            console.log(`comparing ${rooms.get(room).choices[opponent]} to ${msg}`);
            console.log(username + wins);
            io.in(room).emit(`gameOver`, {username: username, string: msg + msg + wins + msg + msg});
        } else {
            io.in(room).emit(`chatMessageReceived`, {username: username, string: msg, turn: turn});
        }
    });

    socket.on('newPick', (data) => {
        const room = data.room;
        const player = data.player;
        const pick = data.pick;
        rooms.get(room).choices[player] = pick;
        io.to(id).emit('pickReceived', pick);
    });



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

