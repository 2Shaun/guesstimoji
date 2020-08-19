import React, { useState } from "react";
import { Link } from "react-router-dom";
// boards is a map where the key is name
// it returns an object of {data, preview}
import boards, { boardNames, smileys } from "../../boards";
import socket from "../../socketlocal";
//import socket from '../../socket';
import "../../index.css";
import { connect } from "react-redux";
import { updateID } from "../../redux/actions";

const smiley = smileys[Math.floor(Math.random() * smileys.length)];
const title = "GUESSTIM" + smiley + "JI";

const Container = ({ handleJoin }) => {
  console.log("in container", handleJoin);
  return (
    <div>
      <h1 align="center">{title}</h1>
      <RoomTextBox handleJoin={handleJoin} />
    </div>
  );
};

const RoomTextBox = ({ handleJoin }) => {
  console.log("in roomtextbox", handleJoin);
  const [board, setBoard] = useState(boards.get(boardNames[1]).data);
  const [roomVal, setRoomVal] = useState();

  const handleBoardClick = (i) => {
    setBoard(boards.get(boardNames[i]).data);
    //console.log(`set board to ${}`);
  };

  // if this causes the textbox to rerender every keystroke
  // there's no way I can socket.emit on that
  // however
  // if I am emitting the board (which I think I have to for custom boards)
  // I will have to emit roomVal to associate board with room
  const handleChange = (event) => {
    const newRoom = event.target.value;
    setRoomVal(newRoom);
  };

  // handleClick will be in JoinButton, a child of RoomTextBox
  // it will pull from newRoom val and board
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
  console.log(handleJoin);

  return (
    <div align="center">
      Room ID:
      <input value={roomVal} onChange={handleChange} />
      <Link
        to={{
          pathname: `/game`,
        }}
      >
        <JoinRoom roomVal={roomVal} board={board} handleJoin={handleJoin} />
      </Link>
      <BoardSelect onClick={handleBoardClick} />
    </div>
  );
};

const JoinRoom = ({ roomVal, board, handleJoin }) => {
  return (
    <button
      id="board-select-button"
      onClick={() => handleJoin({ id: roomVal, board: board })}
    >
      PLAY
    </button>
  );
};

const BoardSelect = (props) => {
  const renderBoardPreview = (i) => {
    return <BoardPreview i={i} onClick={props.onClick} />;
  };
  return (
    <div>
      <h3>Select Board</h3>
      <div id="board-select">
        {renderBoardPreview(1)}
        {renderBoardPreview(2)}
        {renderBoardPreview(3)}
        {renderBoardPreview(5)}
        {renderBoardPreview(6)}
        {renderBoardPreview(7)}
        {renderBoardPreview(8)}
        {renderBoardPreview(0)}
      </div>
    </div>
  );
};

const BoardPreview = (props) => {
  // might be able to create an outer onClick function in here
  // which modifies look of board preview
  // and calls the props.onClick
  const boardName = boardNames[props.i];
  const preview = boards.get(boardName).data.join(" ");
  if (props.i == 1) {
    return (
      <button
        id="board-select-button"
        onClick={() => props.onClick(props.i)}
        autoFocus
      >
        {preview}
      </button>
    );
  }
  return (
    <button id="board-select-button" onClick={() => props.onClick(props.i)}>
      {preview}
    </button>
  );
};

export default Container;
export { title };
