import { createSlice } from '@reduxjs/toolkit';

type PickedState = boolean;

const initialState: PickedState = false;

const pickedSlice = createSlice({
    name: 'picked',
    initialState,
    reducers: {
        playerPicked(state) {
            return true;
        },
        playerReset(state) {
            return false;
        },
    },
});

export const { playerPicked, playerReset } = pickedSlice.actions;
export default pickedSlice.reducer;
