const utils = require('./utils.js');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const moment = require('moment');
// game logic layer

const app = express();
const server = http.Server(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS.split(', '),
    },
});
var roomHashTable = {};

const port = process.env.PORT || 5001;

const validateBoardIndex = (index) => {
    if (typeof index != 'number') {
        console.log('Invalid index type %s', typeof index);
        return false;
    } else if (index < 0) {
        console.log('No negative board index: ', index);
        return false;
    } else if (index >= utils.BOARD_MAX_LENGTH) {
        console.log('Out of bounds of board ', index);
        return false;
    }
    return true;
};

const validateString = (string, key) => {
    const length = string.length;
    if (length <= 0) {
        console.log('%s is an empty string', key);
        return false;
    } else if (string.includes('<') || string.includes('>')) {
        console.log('Potential XSS attack %s', string);
        return false;
    }
    switch (key) {
        case 'message':
            if (length > utils.MESSAGE_MAX_LENGTH) {
                console.log(
                    '%s = %s, length of %d is bigger than max: %d',
                    key,
                    string,
                    length,
                    utils.MESSAGE_MAX_LENGTH
                );
                return false;
            }
            return true;
        case 'roomId':
            if (length > utils.ROOMID_MAX_LENGTH) {
                console.log(
                    '%s = %s, length of %d is bigger than max: %d',
                    key,
                    string,
                    length,
                    utils.ROOMID_MAX_LENGTH
                );
                return false;
            }
            return true;
        case 'pick':
            if (length > utils.PICK_MAX_LENGTH) {
                console.log(
                    '%s = %s, length of %d is bigger than max: %d',
                    key,
                    string,
                    length,
                    utils.PICK_MAX_LENGTH
                );
                return false;
            }
            return true;
        default:
            console.log('Unknown key in validation.');
            return false;
    }
};

// this is to prevent someone from sending objects
// of different shape
const validateObject = (data, valid) => {
    if (!data) {
        console.log('validateObject -> data = ', data);
        return false;
    }
    const dataKeys = Object.keys(data).sort();
    const validKeys = Object.keys(valid);
    if (JSON.stringify(dataKeys) !== JSON.stringify(validKeys)) {
        console.log("%o shape doesn't match shape of %o .", data, valid);
        return false;
    }
    for (key of dataKeys) {
        if (typeof data[key] !== valid[key]) {
            console.log(
                '%o.%s should be of type %s not of type %s',
                data,
                key,
                valid[key],
                typeof data[key]
            );
            return false;
        } else if (!data[key]) {
            console.log('validateObject -> data[key] = ', data[key]);
            return false;
        } else if (
            typeof data[key] === 'string' &&
            !validateString(data[key], key)
        ) {
            return false;
        } else if (key === 'player' && data[key] !== 1 && data[key] !== 2) {
            console.log('%d is not a valid player', player);
        }
    }
    return true;
};

// rooms data structure needs to be fixed
// I think rooms are handled server side,
// i.e., the client has no idea it's in a room
io.sockets.on('connection', (socket) => {
    socket.on('client:rooms/roomsRequested', () => {
        const roomIds = Object.keys(roomHashTable);
        console.log('rooms requested');
        // only show roomIds for which the room is not full
        socket.emit(
            'server:rooms/roomsResponded',
            roomIds.filter((id) =>
                roomHashTable[id] ? !roomHashTable[id].roomFull : false
            )
        );
    });

    // user pressed Join Room button
    socket.on('client:room/roomJoined', (joinData) => {
        if (!validateObject(joinData, utils.JOINDATA_TYPES)) {
            return;
        }
        const { roomId, board } = joinData;
        const serverFull =
            Object.keys(roomHashTable).length > utils.ROOMHASHTABLE_MAX_ENTRIES;
        if (serverFull) {
            // TODO: Make event to tell front end that room is full
            return;
        }
        socket.join(roomId);
        console.log('joining socket: ', roomId);
        // entry shouldn't be deleted if room is full
        socket.on('disconnect', () => {
            // one player disconnected from the game
            if (roomHashTable[roomId].roomFull === true) {
                socket.to(roomId).emit('server:room/roomJoined', {
                    roomFull: false,
                    player: 1,
                });
                roomHashTable[roomId].roomFull = false;
                // player 1 disconnected
                if (roomHashTable[roomId].players[1].socketID === socket.id) {
                    // player 2 now player 1
                    roomHashTable[roomId].players[1] =
                        roomHashTable[roomId].players[2];
                }
                roomHashTable[roomId].players[2] = {
                    username: 'Player 2',
                    socketID: '',
                    pick: '',
                };
                socket.to(roomId).emit('server:gameLog/cleared');
                roomHashTable[roomId].gameLog = [];
            } else {
                delete roomHashTable[roomId];
            }
            console.log(roomHashTable);
        });
        if (roomHashTable[roomId]) {
            // if this is defined
            // the room has a player
            // hence it is now full
            // to sender
            socket.emit('server:room/roomJoined', {
                roomId: roomId,
                // even though Player 2's joinData had a board
                // the board selected by Player 1 takes precedence
                board: roomHashTable[roomId].board,
                roomFull: true,
                player: 2,
            });
            // to player 1
            socket.to(roomId).emit('server:room/player2Joined');
            roomHashTable[roomId].roomFull = true;
            roomHashTable[roomId].players[2].socketID = socket.id;
        } else {
            // roomData EXAMPLE:
            // {xCf6: {board: boards[2], roomFull: false, picks: {1: 😎, 2: 😎},
            //   gameLog[ {username: 'player1', message: 'is it an animal?'}, {username: 'player2', message:'Yes.'}, ...] }}
            const roomData = {
                [roomId]: {
                    board: board,
                    roomFull: false,
                    players: [
                        {},
                        { username: 'Player 1', socketID: socket.id, pick: '' },
                        { username: 'Player 2', socketID: '', pick: '' },
                    ],
                    gameLog: [],
                    game: 0,
                },
            };
            // hash table also needs to store choices
            // roomHashTable EXAMPLE:
            // {AdxD5: {board: boards[5], roomFull: true}, bxCf6: {board: boards[2], roomFull: false}}
            roomHashTable = { ...roomHashTable, ...roomData };
            socket.emit('server:room/roomJoined', {
                roomId: roomId,
                board: board,
                roomFull: false,
                player: 1,
            });
            console.log('roomHashTable', roomHashTable);
        }

        socket.on('client:gameLog/turnSubmitted', (turnData) => {
            if (!validateObject(turnData, utils.TURNDATA_TYPES)) {
                return;
            }
            const { player, message } = turnData;
            const roomEntry = roomHashTable[roomId];
            const { board, players } = roomEntry;
            // players is an array of objects
            const { username } = players[player];
            const newTurnData = { username: username, message: message };
            socket.to(roomId).emit('server:gameLog/turnSubmitted', newTurnData);
            // notice if we use pure immutability,
            // i'd have to make a new roomEntry AND a new hashtable!
            roomEntry.gameLog = [
                {
                    time: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
                    ...newTurnData,
                },
                ...roomEntry.gameLog,
            ];
            const opponent = (player % 2) + 1;
            const { pick: opponentPick } = players[opponent];
            // gameLog is done being modified
            const gameLog = roomEntry.gameLog;
            const playerWin = opponentPick === message;
            const gameOver =
                playerWin || gameLog.length >= utils.GAMELOG_MAX_LENGTH;
            if (gameOver) {
                // now that I've created a new object,
                // all previous variables are stale
                roomHashTable[roomId] = {
                    ...roomEntry,
                    game: roomEntry.game + 1,
                };
                // playerWin was defined from previous state (not stale)
                // player is defined from turnData (not stale)
                const winner = playerWin ? player : 0;
                // stale:
                //const gameID = players[1].socketID +
                //players[2].socketID +
                //game;

                // you can wrap anonymous functions in parenthesis and
                // call them with arguments
                const record = (({ board, players, gameLog, game }) => ({
                    // unique game id is [player1 socketid][player2 socketid][game count]
                    _id: players[1].socketID + players[2].socketID + game,
                    roomId: roomId,
                    winner: winner,
                    board,
                    players,
                    gameLog,
                    game,
                }))(roomHashTable[roomId]);
                /* const record = {
                    _id: gameID,
                    roomId: roomId,
                    winner: winner,
                    board: board,
                    players: players,
                    gameLog: gameLog,
                    game: game,
                    };
                */
                //insertRecordIntoCollection(record, "games");
                // if it is gameOver, log game
                io.in(roomId).emit('server:room/roomJoined', {
                    winner: winner,
                });
                io.in(roomId).emit(
                    'server:gameLog/turnSubmitted',
                    playerWin
                        ? {
                              username: 'guesstimoji',
                              message: `${username} WINS!!!`,
                          }
                        : {
                              username: 'guesstimoji',
                              message: 'Max turns reached. Game ended in draw.',
                          }
                );
            }
            console.log(roomHashTable);
        });
        socket.on('client:players/picked', (pickData) => {
            if (!validateObject(pickData, utils.PICKDATA_TYPES)) {
                return;
            }
            const { pick, player } = pickData;
            // {roomId: players: [{username: , pick: }, {username: ,pick:}]}
            roomHashTable[roomId].players[player].pick = pick;
            if (
                roomHashTable[roomId].players[1].pick &&
                roomHashTable[roomId].players[2].pick
            ) {
                io.in(roomId).emit('server:room/allPlayersBecameReady', {});
            }
            console.log(roomHashTable[roomId].players[player]);
        });
        socket.on('client:players/reset', (resetData) => {
            console.log('Trying to reset', resetData);
            if (!validateObject(resetData, utils.RESETDATA_TYPES)) {
                return;
            }
            // {roomId: players: [{username: , pick: }, {username: ,pick:}]}
            delete roomHashTable[roomId].players[2].pick;
            delete roomHashTable[roomId].players[1].pick;
            socket.to(roomId).emit('server:players/reset', resetData);
        });
        socket.on('client:opponentBoard/clicked', (unflooredIndex) => {
            const index = Math.floor(unflooredIndex);
            if (!validateBoardIndex(index)) {
                return;
            }
            socket.to(roomId).emit('server:opponentBoard/clicked', index);
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

// servers are kind of all-receiving
server.listen(port, () => {
    console.log('ORIGINS: ', process.env.ALLOWED_ORIGINS.split(', '));
    console.log(`Starting server on port ${port}`);
});
