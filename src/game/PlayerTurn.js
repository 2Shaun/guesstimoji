import React, { useState } from 'react'

const PlayerTurn = ({ handleSubmitTurn, askingTurn }) => {
    const [tempQuestion, setTempQuestion] = useState('')
    const onChange = (e) => {
        setTempQuestion(e.target.value)
    }
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
    )
}

export default PlayerTurn
