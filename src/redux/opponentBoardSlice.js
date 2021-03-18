export const opponentBoardReducer = (
    state = new Array(35).fill(true),
    action
) => {
    switch (action.type) {
        case 'opponentBoard/reset':
            return new Array(35).fill(true);
        case 'opponentBoard/click':
            // try to do the (({})=>({}))(state) trick here
            return state.map((x, i) => (i === action.payload ? !x : x));
        default:
            return state;
    }
};

export const clicked = (index) => ({
    type: 'opponentBoard/click',
    payload: index,
});

export const reset = () => ({ type: 'opponentBoard/reset' });
