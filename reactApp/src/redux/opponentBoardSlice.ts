import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpponentBoardState = boolean[];

const initialState: OpponentBoardState = new Array(35).fill(true);

const opponentBoardSlice = createSlice({
    name: 'opponentBoard',
    initialState,
    reducers: {
        reset(state) {
            state = initialState;
        },
        clicked(state, action: PayloadAction<number>) {
            state[action.payload] = !state[action.payload];
        },
    },
});

export const { reset, clicked } = opponentBoardSlice.actions;
export default opponentBoardSlice.reducer;
