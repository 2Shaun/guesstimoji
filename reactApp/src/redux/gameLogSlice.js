export const gameLogReducer = (state = [], action) => {
    switch (action.type) {
        case 'gameLog/cleared':
            return [];
        case 'gameLog/turnSubmitted':
            return [action.payload, ...state];
        default:
            return state;
    }
};

// message is of the form :
//    {username: 'Player 1', message: 'hi' }
export const turnSubmitted = (turnData) => ({
    type: 'gameLog/turnSubmitted',
    payload: turnData,
});

export const cleared = () => ({
    type: 'gameLog/cleared',
});
