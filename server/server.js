const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var hashtable = {};
const findRoomID = (socketRooms) => {
  for (const [key, value] of Object.entries(socketRooms)) {
    // todo: make sure socket.id's are larger than  10 chars
    // set room id limit to 10
    if (value.length <= 10) {
      return value;
    }
  }
  return;
};

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
// I think rooms are handled server side,
// i.e., the client has no idea it's in a room
io.sockets.on("connection", (socket) => {
  //console.log(`connection made ${socket.id}`);
  socket.on(`joinRoom`, (data) => {
    const id = data.id;
    const board = data.board;

    socket.on("disconnect", () => {
      delete hashtable[id];
    });
    socket.join(id);
    if (hashtable[id]) {
      // if this is defined
      // the room has a player
      // hence it is now full
      if (hashtable[id].roomFull === true) {
        socket.emit("gameUpdate", null);
      }
      socket.emit(`gameUpdate`, {
        id: id,
        board: hashtable[id].board,
        roomFull: true,
      });
      hashtable[id].roomFull = true;
    } else {
      // roomData EXAMPLE:
      // {xCf6: {board: boards[2], roomFull: false, picks: {1: 😎, 2: 😎}}}
      const roomData = { [id]: { board: board, roomFull: false } };
      // hash table also needs to store choices
      // hashtable EXAMPLE:
      // {AdxD5: {board: boards[5], roomFull: true}, bxCf6: {board: boards[2], roomFull: false}}
      hashtable = { ...hashtable, ...roomData };
      socket.emit(`gameUpdate`, { id: id, board: board, roomFull: false });
      console.log("hashtable", hashtable);
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
    const id = findRoomID(socket.rooms);
    hashtable[id].picks = {
      ...hashtable[id].picks,
      [data.player]: data.pick,
    };
    console.log(hashtable);
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
