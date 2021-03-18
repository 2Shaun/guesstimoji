export const boardsReducer = (
    state = {
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
    },
    action
) => {
    // action.payload is an array of arrays of 40 emojis
    switch (action.type) {
        case 'gotBoards':
            return {
                ...state,
                boards: action.payload,
                previews: action.payload.map((x) => {
                    let retVal = ``;
                    var i;
                    // this is used to join the emojis
                    // instead of .join because some emojis combine
                    // two unicode characters
                    for (i in x) {
                        // the white space between displays combinations correctly
                        retVal += x[i] + ` `;
                    }
                    return retVal;
                }),
            };
        default:
            return state;
    }
};

export const gotBoards = (boards) => ({
    type: 'gotBoards',
    payload: boards,
});
