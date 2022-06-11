import React, { useState } from 'react';

interface Props {
    handleSubmitTurn: HandleSubmitTurn;
    askingTurn: boolean;
}

const PlayerTurn = ({ handleSubmitTurn, askingTurn }: Props) => {
    const [tempQuestion, setTempQuestion] = useState('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempQuestion(e.target.value);
    };
    return askingTurn ? (
        <div>
            <input
                onChange={onChange}
                value={tempQuestion}
                placeholder="Ask question or guess"
            />
            <button
                id="board-select-button"
                onClick={() => handleSubmitTurn(tempQuestion)}
            >
                SEND
            </button>
        </div>
    ) : (
        <div>
            <button
                id="board-select-button"
                onClick={() => handleSubmitTurn('Yes.')}
            >
                YES
            </button>
            <button
                id="board-select-button"
                onClick={() => handleSubmitTurn('No.')}
            >
                NO
            </button>
        </div>
    );
};

export default PlayerTurn;
