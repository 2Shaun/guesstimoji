import React, { useState } from 'react'

function PickTextBox({ pick }) {
    return (
        <button className="choice">
            {pick ? `You picked ${pick}.` : `Pick your emoji!`}
        </button>
    )
}

export default PickTextBox
