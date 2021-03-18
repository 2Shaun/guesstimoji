import React, { useState } from 'react';
function Square({ index, socket, value, onClick, onContextMenu }) {
    // note the use of jsx in onClick attribute and button content
    const [show, setShow] = useState(true);

    return (
        <button
            className="square"
            onClick={
                onClick
                    ? onClick
                    : () => {
                          setShow(!show);
                          socket.emit('client:opponentBoard/clicked', index);
                      }
            }
            onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu();
            }}
        >
            {show ? value : '█'}
        </button>
    );
}

export default Square;
