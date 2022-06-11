export const clientEvents = {
    rooms: {
        roomsRequested: 'client:rooms/roomsRequested',
    },
    room: {
        roomJoined: 'client:room/roomJoined',
    },
    gameLog: {
        turnSubmitted: 'client:gameLog/turnSubmitted',
    },
    players: {
        picked: 'client:players/picked',
    },
};

export const serverEvents = {
    rooms: {
        roomsResponded: 'server:rooms/roomsResponded',
    },
    room: {
        roomJoined: 'server:room/roomJoined',
        player2Joined: 'server:room/player2Joined',
        allPlayersBecameReady: 'server:room/allPlayersBecameReady',
    },
    players: {
        reset: 'server:players/reset',
    },
    gameLog: {
        cleared: 'server:gameLog/cleared',
        turnSubmitted: 'server:gameLog/turnSubmitted',
    },
    opponentBoard: {
        clicked: 'server:opponentBoard/clicked',
    },
};
