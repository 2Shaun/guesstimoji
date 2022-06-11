import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const randomWords = require('random-words');

type RoomState = {
    roomId: string;
    roomFull: boolean;
    board: string[];
    randomSmiley: string;
    restartable: boolean;
    allPlayersReady: boolean;
    player: number;
};

const initialState: RoomState = {
    roomId: randomWords(),
    roomFull: false,
    board: [],
    randomSmiley: '😎',
    restartable: false,
    allPlayersReady: false,
    // TODO: Make sure this initial value does not cause problems
    player: 0,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        // this only fires when server tells the client they've joined
        roomJoined(state, action: PayloadAction<ServerJoinData>) {
            state.roomId = action.payload.roomId;
            state.board = action.payload.board;
            state.roomFull = action.payload.roomFull;
            state.player = action.payload.player;
        },
        player2Joined(state) {
            state.roomFull = true;
        },
        homePageLoaded(state, action: PayloadAction<string>) {
            state.randomSmiley = action.payload;
        },
        roomRestartable(state) {
            state.restartable = true;
        },
        roomRestarted(state) {
            state.restartable = false;
            state.allPlayersReady = false;
        },
        allPlayersBecameReady(state) {
            state.allPlayersReady = true;
        },
    },
});

export const {
    roomJoined,
    player2Joined,
    homePageLoaded,
    roomRestartable,
    roomRestarted,
    allPlayersBecameReady,
} = roomSlice.actions;

export default roomSlice.reducer;
