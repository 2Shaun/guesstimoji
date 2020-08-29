const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const mongoClient = require('mongodb').MongoClient;
const moment = require("moment");
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const url = 'mongodb://127.0.0.1:27017/';
var roomHashTable = {};

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
// METHOD - http verb
// PATH - url which client sent METHOD
// HANDLER is executed when the METHOD is called on PATH

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
    if (roomHashTable[roomID]?.roomFull === true) {
      socket.emit("server:room/roomJoined", null);
      return;
    }
    socket.join(roomID);
    // entry shouldn't be deleted if room is full
    socket.on("disconnect", () => {
      // one player disconnected from the game
      if (roomHashTable[roomID].roomFull === true) {
        socket.to(roomID).emit("server:room/roomJoined", {
          roomFull: false,
          player: 1,
        });
        roomHashTable[roomID].roomFull = false;
        // player 1 disconnected
        if (roomHashTable[roomID].players[1].socketID === socket.id) {
          // player 2 now player 1
          roomHashTable[roomID].players[1] = roomHashTable[roomID].players[2];
        }
        roomHashTable[roomID].players[2] = {
          username: "Player 2",
          socketID: "",
          pick: "",
        };
        socket.to(roomID).emit("server:gameLog/cleared");
        roomHashTable[roomID].gameLog = [];
      } else {
        delete roomHashTable[roomID];
      }
      console.log(roomHashTable);
    });
    if (roomHashTable[roomID]) {
      // if this is defined
      // the room has a player
      // hence it is now full
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
      roomHashTable[roomID].players[2].socketID = socket.id;
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
            { username: "Player 1", socketID: socket.id, pick: "" },
            { username: "Player 2", socketID: "", pick: "" },
          ],
          gameLog: [],
          game: 0,
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
      const opponent = (player % 2) + 1;
      roomEntry = roomHashTable[roomID];
      const username = roomEntry.players[player].username;
      const newTurnData = { username: username, message: message };
      socket.to(roomID).emit("server:gameLog/turnSubmitted", newTurnData);
      const gameLog = roomEntry.gameLog;
      roomEntry.gameLog = [{ time: moment().utc().format(), ...newTurnData }, ...gameLog];
      if (roomEntry.players[opponent].pick === message) {
        io.in(roomID).emit("server:room/roomJoined", { winner: player });
        io.in(roomID).emit("server:gameLog/turnSubmitted", {
          username: "guesstimoji",
          message: `${username} WINS!!!`,
        });
        roomEntry.game += 1;
        // unique game id is [player1 socketid][player2 socketid][game count]
        const gameID = roomEntry.players[1].socketID + roomEntry.players[2].socketID + roomHashTable[roomID].game;
        mongoClient.connect(url, (err, db) => {
          if (err) throw err;
          var dbo = db.db("guesstimoji");
          const record = { _id: gameID, roomID: roomID, winner: username, board: roomEntry.board, players: roomEntry.players, gameLog: roomEntry.gameLog, game: roomEntry.game };
          dbo.collection("games").insertOne(record, (err, res) => {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        });
      }
      console.log(roomHashTable);
    });
    socket.on("client:players/picked", (pickData) => {
      const { player, pick } = pickData;
      // {roomID: players: [{username: , pick: }, {username: ,pick:}]}
      roomHashTable[roomID].players[player].pick = pick;
      console.log(roomHashTable[roomID].players[player]);
    });
    socket.on("client:opponentBoard/clicked", (index) => {
      socket.to(roomID).emit("server:opponentBoard/clicked", index);
    });
  });
});

app.get('/', (req, res) => { res.send('Hello world') });

// servers are kind of all-receiving
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
