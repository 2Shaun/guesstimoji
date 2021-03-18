import React from 'react'

const JoinRoomButton = ({ roomID, board, handleJoin }) => {
    return (
        <button
            id="board-select-button"
            onClick={() => handleJoin({ roomID: roomID, board: board })}
        >
            PLAY
        </button>
    )
}

export default JoinRoomButton
