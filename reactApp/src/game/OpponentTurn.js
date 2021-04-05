import React from 'react';
const OpponentTurn = ({ opponent, askingTurn }) =>
    askingTurn ? (
        <div>{`Waiting for Player ${opponent} to ask...`}</div>
    ) : (
        <div>{`Waiting for Player ${opponent} to answer your question...`}</div>
    );

export default OpponentTurn;
