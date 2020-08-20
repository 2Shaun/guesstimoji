const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var hashtable = {};

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

io.sockets.on("connection", (socket) => {
  //console.log(`connection made ${socket.id}`);
  socket.on(`joinRoom`, (data) => {
    const id = data.id;
    const board = data.board;
    console.log("board", board);

    socket.join(id);
    if (hashtable.id) {
      // if this is defined
      // the room has a player
      // hence it is now full
      if (hashtable.id.roomFull === true) {
        io.in(id).emit("gameUpdate", null);
      }
      io.in(id).emit(`gameUpdate`, {
        id: id,
        board: hashtable.id.board,
        roomFull: true,
      });
    } else {
      // roomData EXAMPLE:
      // {xCf6: {board: boards[2], roomFull: false}}
      const roomData = {};
      roomData.id = { board: board, roomFull: false };
      // hashtable EXAMPLE:
      // {AdxD5: {board: boards[5], roomFull: true}, bxCf6: {board: boards[2], roomFull: false}}
      hashtable = { ...hashtable, ...roomData };
      io.in(id).emit(`gameUpdate`, { id: id, board: board, roomFull: false });
    }
  });
  socket.on("requestGameUpdate", (data) => {
    const room = data.room;
    var board = data.board;
    if (rooms.get(room) === undefined) {
      // choices should be an array
      // I want rooms to be a data structure such that I can do
      // rooms.set(data.room).board = data.board
      //rooms.set(data.room, {board: data.board, numPlayers: 1, player1Choice: '', player2Choice: ''});
      rooms.set(room, { board: board, numPlayers: 1, choices: [] });
      // want to switch gameUpdate to go to socketID
      io.in(room).emit(`gameUpdate`, { board: board, numPlayers: 1 });
    } else {
      board = rooms.get(room).board;
      const numPlayers = rooms.get(room).numPlayers + 1;
      rooms.get(room).numPlayers = numPlayers;
      io.in(data.room).emit("gameUpdate", {
        board: board,
        numPlayers: numPlayers,
      });
      if (numPlayers === 2) {
        io.in(data.room).emit("player2Joined");
      }
    }
  });
  socket.on("chatMessageSent", (data) => {
    const player = data.player;
    const opponent = (player % 2) + 1;
    const msg = data.msg.trim();
    const room = data.room;
    const turn = data.turn;
    // the winning condition is to send a message that is your opponent's choice
    if (rooms.get(room).choices[opponent] === msg) {
      io.in(room).emit(`gameOver`, { player: player, string: msg });
    } else {
      io.in(room).emit(`chatMessageReceived`, {
        player: player,
        string: msg,
        turn: turn,
      });
    }
  });

  socket.on("newPick", (data) => {
    const room = data.room;
    const player = data.player;
    const pick = data.pick;
    rooms.get(room).choices[player] = pick;
    io.to(id).emit("pickReceived", pick);
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
  socket.on("newState", (data) => {
    // if this is broadcasted to sender,
    // you're liable to cause an inf loop
    socket.broadcast.to(data.room).emit("setState", data.squares);
    //console.log(`${socket.id} has sent ${data.squares} to ${data.room}`);
    //socket.emit('setState', data.squares);
    //io.emit('setState', data.squares);
  });
});

server.listen(port, () => {
  //console.log(`Starting server on port ${port}`);
});
