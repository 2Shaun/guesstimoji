import React, { useState } from 'react'
function OpponentSquare(props) {
    // note the use of jsx in onClick attribute and button content
    const [squareVal, setSquareVal] = useState(props.value)
    return <button className="opponent-square">{props.value}</button>
}

export default OpponentSquare
