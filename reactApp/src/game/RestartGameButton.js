import React from 'react';

const RestartGameButton = ({ roomID, board, handleRestart }) => {
    return (
        <button className="nice-button" onClick={() => handleRestart({ roomID: roomID, board: board })}>
            RESTART GAME
        </button>
    );
};

export default RestartGameButton;
