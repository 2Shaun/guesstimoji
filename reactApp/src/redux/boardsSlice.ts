import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BoardsState = {
    boards: string[][];
    previews: string[];
};

const initialState: BoardsState = {
    boards: [
        [
            '🤣',
            '😂',
            '🙂',
            '😄',
            '🙃',
            '😊',
            '😉',
            '😇',
            '😍',
            '🥰',
            '🤩',
            '😃',
            '😅',
            '😁',
            '😆',
            '😗',
            '😀',
            '😚',
            '☺️',
            '☺',
            '😙',
            '🥲',
            '😋',
            '😛',
            '😘',
            '😜',
            '🤪',
            '😝',
            '🤑',
            '🤗',
            '🤭',
            '🤫',
            '🤔',
            '🤐',
            '🤨',
            '😐',
            '😑',
            '😶',
            '😏',
            '😒',
        ],
    ],
    previews: [],
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        gotBoards(state, action: PayloadAction<string[][]>) {
            state.boards = action.payload;
            state.previews = action.payload.map((board) => {
                let retVal = ``;
                var i;
                // this is used to join the emojis
                // instead of .join because some emojis combine
                // two unicode characters
                for (i in board) {
                    // the white space between displays combinations correctly
                    retVal += board[i] + ` `;
                }
                return retVal;
            });
        },
    },
});

export const { gotBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
