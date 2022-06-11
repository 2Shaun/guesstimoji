import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice';
import gameLogReducer from './gameLogSlice';
import opponentBoardReducer from './opponentBoardSlice';
import pickedReducer from './pickedSlice';
import boardsReducer from './boardsSlice';
import roomsReducer from './roomsSlice';

const store = configureStore({
    reducer: {
        room: roomReducer,
        gameLog: gameLogReducer,
        opponentBoard: opponentBoardReducer,
        picked: pickedReducer,
        boards: boardsReducer,
        rooms: roomsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
