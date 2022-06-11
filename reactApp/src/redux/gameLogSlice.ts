import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameLogState = Turn[];

const initialState: GameLogState = [];

const gameLogSlice = createSlice({
    name: 'gameLog',
    initialState,
    reducers: {
        turnSubmitted(state, action: PayloadAction<Turn>) {
            state.unshift(action.payload);
        },
        gameRestarted(state) {
            state = [];
        },
        cleared(state) {
            state = [];
        },
    },
});

export const { turnSubmitted, gameRestarted, cleared } = gameLogSlice.actions;
export default gameLogSlice.reducer;
