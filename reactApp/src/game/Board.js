import React, { useState } from 'react';
import Square from './Square';
import Choice from './PickTextBox';
import { connect } from 'react-redux';
import { playerPicked } from '../redux/playersSlice';

// i'm hoping that when the client socket emits a request,
// the server will be able to extract room information
// and access gamedata hashtable with that
const Board = ({ socket, board, player, picked, playerPicked }) => {
    //const [freshBoard, setFreshBoard] = useState(easterEgg(props.room));
    // THE INITIAL VALUE OF STATE WILL BE ASSIGNED ONLY
    // ON THE INITIAL RENDER
    // IN SUBSEQUENT RENDERS, THE ARGUMENT OF USESTATE
    // WILL BE IGNORED AND THE CURRENT VALUE WILL BE
    // RETRIEVED
    const [pick, setPick] = useState('');

    // with 2 boards, there is no reason to listen on the player's board
    //socket.on(`setState`, (newSquares) => (setSquares(newSquares)));
    //socket.on(`setFreshBoard`, (newFreshBoard) => (setFreshBoard(newFreshBoard)));
    const handlePick = (i) => {
        // saves typing this.state.
        // can only change board if 2 players in room
        // will need some 'original player' condition if I
        // allow players to spectate
        socket.emit('client:players/picked', {
            player: player,
            pick: board[i],
        });
        playerPicked();
        setPick(board[i]);
    };
    // this is a white space char, not a space
    // a space causes shifting of rows

    // sends a request to server to update board on click
    // might make it return something to synchronize events
    // emit to everyone in room but self
    // set square field without server
    //socket.emit("newState", { squares: newSquares });
    //setSquares(newSquares);

    const handleContextMenu = (i) => {
        navigator.clipboard.writeText(board[i]).then(
            () => {
                alert(board[i] + ' copied! Paste it in the board to guess!');
            },
            () => {
                alert("Couldn't copy emoji. Invalid permissions.");
            }
        );
    };

    const renderSquare = (i) => {
        return (
            <Square
                index={i}
                socket={socket}
                value={board[i]}
                onClick={!picked ? () => handlePick(i) : null}
                onContextMenu={() => {
                    handleContextMenu(i);
                }}
            />
        );
    };
    return (
        <div>
            <div class="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
            </div>
            <div class="board-row">
                {renderSquare(7)}
                {renderSquare(8)}
                {renderSquare(9)}
                {renderSquare(10)}
                {renderSquare(11)}
                {renderSquare(12)}
                {renderSquare(13)}
            </div>
            <div class="board-row">
                {renderSquare(14)}
                {renderSquare(15)}
                {renderSquare(16)}
                {renderSquare(17)}
                {renderSquare(18)}
                {renderSquare(19)}
                {renderSquare(20)}
            </div>
            <div class="board-row">
                {renderSquare(21)}
                {renderSquare(22)}
                {renderSquare(23)}
                {renderSquare(24)}
                {renderSquare(25)}
                {renderSquare(26)}
                {renderSquare(27)}
            </div>
            <div class="board-row">
                {renderSquare(28)}
                {renderSquare(29)}
                {renderSquare(30)}
                {renderSquare(31)}
                {renderSquare(32)}
                {renderSquare(33)}
                {renderSquare(34)}
            </div>
            <div class="text-row">
                <Choice pick={pick} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    picked: state.player,
});

const mapDispatchToProps = {
    playerPicked,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
