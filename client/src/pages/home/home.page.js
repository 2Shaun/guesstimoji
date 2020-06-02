import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// boards is a map where the key is name
// it returns an object of {data, preview}
import boards, { boardNames, smileys } from '../../boards';
import socket from '../../socketlocal';
//import socket from '../../socket';
import '../../index.css';

const smiley = smileys[Math.floor(Math.random() * smileys.length)];
const title = "GUESSTIM"+smiley+"JI";

const Container = (props) => {




    return(
        <div>
        <h1 align="center">{title}</ h1>
        <RoomTextBox />
        </div>
    );

};


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const RoomTextBox = (props) => {
    const [roomVal, setRoomVal] = useState(makeid(5));
    const [board, setBoard] = useState(boards.get(boardNames[1]).data);

    const handleBoardClick = (i) => {
        setBoard(boards.get(boardNames[i]).data);
        //console.log(`set board to ${}`);
    }


    // if this causes the textbox to rerender every keystroke
    // there's no way I can socket.emit on that
    // however
    // if I am emitting the board (which I think I have to for custom boards)
    // I will have to emit roomVal to associate board with room
    const handleChange = (event) => {
        const newRoom = event.target.value;
        setRoomVal(newRoom);
    }

    // handleClick will be in JoinButton, a child of RoomTextBox
    // it will pull from newRoom val and board
    const handleClick = () => {
        console.log(`board ${board}`);
        socket.emit(`joinRoom`, {board: board, room: roomVal});
    }
    /*
    return(
        <div>
            <input value={roomVal} onChange={handleChange} />
            <Link to={`/game?room=${roomVal}`} >
                <button 
          className="join"
          >
            Join Room
          </button>
          </Link>
        </div>
    );
    */

    return(
        <div align="center">
            Room ID:
            <input value={roomVal} onChange={handleChange} />
            <Link to={{
                pathname: `/game`,
                state: {
                    roomVal: roomVal, 
                    board: board

                }
        }} >
            <JoinRoom onClick={handleClick} />
            </Link>
            <BoardSelect onClick={handleBoardClick} />
        </div>
    );
};

const JoinRoom = (props) => {
    return(
        <button id="board-select-button"
        onClick={() => {props.onClick()}}>
            PLAY
        </button>
    );
}


const BoardSelect = (props) => {
    const renderBoardPreview = (i) => {
        return( 
            <BoardPreview 
                i={i}
                onClick={props.onClick}
            />
        );
    }
    return(
        <div>
        <h3>Select Board</h3>
        <div id="board-select">
            {renderBoardPreview(1)}
            {renderBoardPreview(2)}
            {renderBoardPreview(3)}
            {renderBoardPreview(4)}
            {renderBoardPreview(5)}
            {renderBoardPreview(6)}
            {renderBoardPreview(7)}
            {renderBoardPreview(0)}
        </div>
        </div>
    );
}

const BoardPreview = (props) => {
    // might be able to create an outer onClick function in here
    // which modifies look of board preview
    // and calls the props.onClick
    const boardName = boardNames[props.i];
    const preview = boards.get(boardName).preview;
    if ( props.i == 1){
        return(
        <button 
        id="board-select-button"
        onClick={() => props.onClick(props.i)}
        autoFocus>
            {boardName}<br />{preview}
        </button>
        );
    }
    return(
    <button 
        id="board-select-button"
        onClick={() => props.onClick(props.i)}
        >
            {boardName}<br/>{preview}
        </button>
    );
}
export default Container;
export {title};