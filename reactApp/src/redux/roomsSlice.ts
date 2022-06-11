import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RoomsState = string[];

const initialState: RoomsState = [];

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        gotRooms(state, action: PayloadAction<string[]>) {
            state = action.payload;
        },
    },
});

export const { gotRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
