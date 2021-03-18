export const roomsReducer = (state = [], action) => {
    // action.payload is an array of arrays of 40 emojis
    switch (action.type) {
        case 'gotRooms':
            // don't want to spread array here bc not saving
            return action.payload
        default:
            return state
    }
}

export const gotRooms = (rooms) => ({
    type: 'gotRooms',
    payload: rooms,
})
