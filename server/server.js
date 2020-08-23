const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
// the server should handle all game logic
// after player 2 joins:
// game: {turn: [2,2], gameLog:[]}
// turn cycle:
// [2,2]->[1,1]->[1,2]->[2,1]->[2,2]

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
const calculateNextTurn = (turn) => {
  switch (turn) {
    case arraysEqual(turn, [1, 1]):
      return [1, 2];
      break;
    case arraysEqual(turn, [1, 2]):
      return [2, 1];
      break;
    case arraysEqual(turn, [2, 1]):
      return [2, 2];
      break;
    case arraysEqual(turn, [2, 2]):
      return [1, 1];
      break;
  }
};
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var roomHashTable = {};
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
// server.js is a lot like a reducer
// logic should be here
// events represent action types
// data represents actions
// the hashtable should represent each rooms state tree
// each room should then have a games hash table
// representing the state tree of each game
// game : {1:
//            {board: board[1],
//             players: [,{username: 'player1', pick: '😋'},{username: 'player2', pick: '😋'}]
//             turn: [2,2],
//             roomFull: true,
//             gameLog:
//                [
//                  {username: 2, message: 'is it a mammal?'},
//                  {username: 1, message: 'Yes.'}
//                ]
//
//
//}}

// rooms data structure needs to be fixed
// I think rooms are handled server side,
// i.e., the client has no idea it's in a room
io.sockets.on("connection", (socket) => {
  socket.on("client:room/roomJoined", (joinData) => {
    const { roomID, board } = joinData;
    // entry shouldn't be deleted if room is full
    socket.on("disconnect", () => {
      delete roomHashTable[roomID];
    });
    socket.join(roomID);
    if (roomHashTable[roomID]) {
      // if this is defined
      // the room has a player
      // hence it is now full
      if (roomHashTable[roomID].roomFull === true) {
        socket.emit("server:room/roomJoined", null);
      }
      // to sender
      socket.emit("server:room/roomJoined", {
        roomID: roomID,
        board: roomHashTable[roomID].board,
        roomFull: true,
        player: 2,
      });
      // to player 1
      socket.to(roomID).emit("server:room/roomJoined", {
        roomFull: true,
      });
      roomHashTable[roomID].roomFull = true;
    } else {
      // roomData EXAMPLE:
      // {xCf6: {board: boards[2], roomFull: false, picks: {1: 😎, 2: 😎},
      //   gameLog[ {username: 'player1', message: 'is it an animal?'}, {username: 'player2', message:'Yes.'}, ...] }}
      const roomData = {
        [roomID]: {
          board: board,
          roomFull: false,
          players: [
            {},
            { username: "Player 1", pick: "" },
            { username: "Player 2", pick: "" },
          ],
          gameLog: [],
        },
      };
      // hash table also needs to store choices
      // roomHashTable EXAMPLE:
      // {AdxD5: {board: boards[5], roomFull: true}, bxCf6: {board: boards[2], roomFull: false}}
      roomHashTable = { ...roomHashTable, ...roomData };
      socket.emit("server:room/roomJoined", {
        roomID: roomID,
        board: board,
        roomFull: false,
        player: 1,
      });
      console.log("roomHashTable", roomHashTable);
    }
    socket.on("client:gameLog/turnSubmitted", (turnData) => {
      const { player, message } = turnData;
      const username = roomHashTable[roomID].players[player].username;
      const newTurnData = { username: username, message: message };
      socket.to(roomID).emit("server:gameLog/turnSubmitted", newTurnData);
      const gameLog = roomHashTable[roomID].gameLog;
      roomHashTable[roomID].gameLog = [newTurnData, ...gameLog];
      console.log(newTurnData);
    });
    socket.on("client:players/picked", (pickData) => {
      const { player, pick } = pickData;
      // {roomID: players: [{username: , pick: }, {username: ,pick:}]}
      console.log(roomID);
      roomHashTable[roomID].players[player].pick = pick;
      console.log(roomHashTable[roomID].players[player]);
    });
  });
});
/*
  socket.on("questionSent", (data) => {
    const { player, message } = data;
    const opponent = (player % 2) + 1;
    // avoiding sending roomID to server since
    // the information is in socket
    const roomID = findRoomID(socket.rooms);
    const turn = data.turn;
    // hashtable entry example
    // {xCf6: {board: boards[2], roomFull: false, picks: {1: 😎, 2: 😎}}}
    // the winning condition is to send a message that is your opponent's choice
    if (roomHashTable[roomID].picks[opponent] === message) {
      io.in(room).emit("gameOver", { player: player, message: message });
    } else {
      io.in(room).emit("gameLogMessageReceived", {
        player: player,
        message: message,
        turn: [opponent, 1],
      });
    }
  });
  */

// can probably use socket.once here

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
server.listen(port, () => {
  //console.log(`Starting server on port ${port}`);
});
